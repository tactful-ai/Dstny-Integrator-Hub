# Triggers

:::info

The build integrations section is best understood when read from beginning to end. To get the most value out of it, start from the first page and read through page by page.

1. [Overview page](/integrator-hub/overview)
2. [Auth](/integrator-hub/authentication)
3. [<mark>Triggers</mark>](/integrator-hub/triggers)
4. [Actions](/integrator-hub/actions)

:::

You need to set **Name**, **key**, **description** for your trigger. Next if the trigger requires any input fields you can add them by clicking on **Add another field** button in the input designer page, then click continue.


## Configure Your Api Request

### $.http

It's an HTTP client to be used for making HTTP requests. It's a wrapper around the [axios](https://axios-http.com) library. We use this property when we need to make HTTP requests to the third-party service. The `apiBaseUrl` field we set up in the app will be used as the base URL for the HTTP requests. For example, to search the cat images, we can use the following code:

for example: 

```typescript
await $.http.get('/customers', {
  headers: {
    'x-api-key': $.auth.data.apiKey,
  },
});
```

Based on your system you can use `$.http.get`, `$.http.post`, `$.http.put`, `$.http.delete` to make the corresponding HTTP request. Then you can parse your response and return the result.

for example: 

```typescript
response.data.items.forEach((customer :IJSONObject) => {
    const dataItem = {
      raw: customer,
      meta: {
        internalId: customer.id.toString(),
      },
    };
```


### $.step.parameters

```typescript
$.step.parameters; // { key: 'value' }
```

It refers to the parameters that are set by users in the UI. We use this property when we need to get the parameters for corresponding triggers and actions. For example [Send a message to channel](https://github.com/automatisch/automatisch/blob/main/packages/backend/src/apps/slack/actions/send-a-message-to-channel/post-message.ts) action from Slack integration, we have a step parameter called `message` that we need to use in the action. We can use `$.step.parameters.message` to get the value of the message to send a message to the Slack channel.


