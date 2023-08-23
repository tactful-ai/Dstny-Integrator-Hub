import defineAction from '../../../../helpers/define-action';

export default defineAction({
  name: 'Delete customer',
  key: 'deleteCustomer',
  description: 'Deletes a customer',
  arguments: [
    {
      label: 'Customer ID',
      key: 'id',
      type: 'string' as const,
      required: true,
      description: 'The ID of the customer you want to delete',
      variables: true,
    },
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
