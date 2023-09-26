# Triggers

:::info

The build integrations section is best understood when read from beginning to end. To get the most value out of it, start from the first page and read through page by page.

1. [Overview page](/integrator-hub/overview)
2. [Auth](/integrator-hub/authentication)
3. [<mark>Triggers</mark>](/integrator-hub/triggers)
4. [Actions](/integrator-hub/actions)

:::

You need to set **Name**, **key**, **description** for your trigger. Next if the trigger requires any input fields you can add them by clicking on **Add another field** button in the input designer page, then click continue.


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


### $.pushTriggerItem

```typescript
$.pushTriggerItem({
  raw: resourceData,
  meta: {
    id: resourceData.id,
  },
});
```

It's used to push trigger data to be processed by Integrator Hub. It must reflect the data that we get from the third-party service. Let's say for search tweets trigger the `resourceData` will be the JSON that represents the single tweet object.



#### Create Customer trigger in Zendesk
```typescript 
let page = 0;
let response;

const headers = {
  'Authorization': `${$.auth.data.api_Key as string}`
};

do {
  const requestPath = `/users`;
  response = await $.http.get(requestPath, { headers });

  response.data.users.forEach((user :IJSONObject) => {
    const dataItem = {
      raw: user,
      meta: {
        internalId: user.id.toString(),
      },
    };

    $.pushTriggerItem(dataItem);
  });

  page += 1;
} while (response.data.users.length >= 10);

```