import { IJSONObject } from '@automatisch/types';
import defineTrigger from '../../../../helpers/define-trigger';

export default defineTrigger({
  name: 'Create New Customer',
  key: 'createNewCustomer',
  pollInterval: 15,
  description: 'Triggers when there is a new customer.',

  async run($) {
    let page = 0;
    let response;

    const headers = {
      'X-API-KEY': $.auth.data.apiKey as string,
    };


    do {
      const requestPath = `/customers?page=${page}&limit=10&order=DESC`;
      response = await $.http.get(requestPath, { headers });

      response.data.items.forEach((customer: IJSONObject) => {
        const dataItem = {
          raw: customer,
          meta: {
            internalId: customer.id.toString(),
          },
        };

        $.pushTriggerItem(dataItem);
      });

      page += 1;
    } while (response.data.length >= 10);
  },
});
