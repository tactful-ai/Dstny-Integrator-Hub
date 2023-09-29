
# Actions
:::info

The build integrations section is best understood when read from beginning to end. To get the most value out of it, start from the first page and read through page by page.

1. [Overview page](/integrator-hub/overview)
2. [Auth](/integrator-hub/authentication)
3. [Triggers](/integrator-hub/triggers)
4. [Actions](/integrator-hub/actions)

:::

You need to set **Name**, **key**, **description** for your trigger. Next if the action requires any input fields you can add them by clicking on **Add another field** button in the input designer page, then click continue.

## Configure Your API Request

## $.auth.data

```typescript
$.auth.data; // { key: 'value' }
```

It's used to retrieve the authentication data that we set with fields in the authentication step. The data will be retrieved from the database. We use the data property with the key name when we need to get one specific value from the data object.

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

## $.setActionItem

```typescript
$.setActionItem({
  raw: resourceData,
});
```

It's used to set the action data to be processed by Integrator Hub. For actions, it reflects the response data that we get from the third-party service. Let's say for create tweet action it will be the JSON that represents the response payload we get while creating a tweet.

Incase of our action in Dstnyengage to create a customer, we can use the following code:

```typescript
let response;
const requestPath = '/customers';
const data = $.step.parameters;
response = await $.http.post(requestPath, data);

$.setActionItem({raw: response.data});
```