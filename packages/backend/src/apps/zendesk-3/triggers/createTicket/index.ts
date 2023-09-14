
import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: 'Create Ticket',
  key: 'createTicket',
  pollInterval: 15,
  description: 'Triggers when there is a new ticket.',

  async run($) {
    
  let page = 0;
  let response;

  const headers = {
    'Authorization': `Basic bW9hei5lbHNheWVkMDAyQGdtYWlsLmNvbTpxOUp4U1x3RlY2RXpcP1p7LVBnSGF+PW1d`
  };

  do {
    const requestPath = `/tickets`;
    response = await $.http.get(requestPath, { headers });

    console.log(response);
    response.data.tickets.forEach((ticket :IJSONObject) => {
      const dataItem = {
        raw: ticket,
        meta: {
          internalId: ticket.id.toString(),
        },
      };

      $.pushTriggerItem(dataItem);
    });

    page += 1;
  } while (response.data.tickets.length >= 10);

  },
});
