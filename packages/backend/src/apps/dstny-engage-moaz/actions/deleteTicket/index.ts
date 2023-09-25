
import { IJSONObject } from '@automatisch/types';
import defineActions from '../../../../helpers/define-action';

export default defineActions({
  name: 'delete ticket',
  key: 'deleteTicket',
  description: 'deletes a ticket. testing',
  arguments: [
  {
    "label": "Ticket ID",
    "key": "id",
    "type": "dropdown",
    "required": false,
    "description": "The ID of the ticket you want to delete testing",
    "variables": false
  }
],

  async run($) {
    const requestPath = `/customers/${$.step.parameters.id}`;

const headers = {
  'X-API-KEY': $.auth.data.authToken as string,
};

const response = await $.http.delete(
  requestPath,
);

$.setActionItem({ raw: response.data });
  },
});
