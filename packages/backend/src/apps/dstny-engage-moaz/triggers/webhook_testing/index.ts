
import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: 'webhook',
  key: 'webhook_testing',
  type: 'webhook',
  description: 'webhook trigger testing',
  arguments: 
[
  {
    "label": "q",
    "key": "q",
    "type": "dropdown",
    "required": true,
    "description": "q",
    "variables": false
  },
  {
    "label": "d",
    "key": "d",
    "type": "dropdown",
    "required": true,
    "description": "d",
    "variables": false
  }
],

  async testRun($) {
    const { data: form } = await $.http.get(`/forms/${$.step.parameters.formId}`);

const { data: responses } = await $.http.get(`/forms/${$.step.parameters.formId}/responses`);

const lastResponse = responses.items[0];

if (!lastResponse) {
  return;
}

const computedWebhookEvent = {
  event_type: `form_response`,
  form_response: {
    form_id: form.id,
    token: lastResponse.token,
    landed_at: lastResponse.landed_at,
    submitted_at: lastResponse.submitted_at,
    definition: {
      id: $.step.parameters.formId,
      title: form.title,
      fields: form?.fields,
    },
    answers: lastResponse.answers,
  },
};

const dataItem = {
  raw: computedWebhookEvent,
  meta: {
    internalId: computedWebhookEvent.form_response.token,
  },
};

$.pushTriggerItem(dataItem);
  },

  async registerHook($) {
    const subscriptionPayload = {
  enabled: true,
  url: $.webhookUrl,
};

await $.http.put(`/forms/${$.step.parameters.formId}/webhooks/${$.flow.id}`, subscriptionPayload);
  },

  async unregisterHook($) {
    await $.http.delete(`/forms/${$.step.parameters.formId}/webhooks/${$.flow.id}`);
  },
});
