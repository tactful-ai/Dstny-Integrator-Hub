
import { IJSONObject } from '@automatisch/types';
import defineActions from '../../../../helpers/define-action';

export default defineActions({
  name: 'delete ticket',
  key: 'deleteTicket',
  description: 'deletes a ticket',
  arguments: [
  {
    "label": "Ticket ID",
    "key": "id",
    "type": "string",
    "required": true,
    "description": "The ID of the ticket you want to delete",
    "variables": true
  }
],

  async run($) {
    const requestPath = `/tickets/${$.step.parameters.id as number}`;

const response = await $.http.delete(requestPath);

$.setActionItem({ raw: response.headers });
  },
});
