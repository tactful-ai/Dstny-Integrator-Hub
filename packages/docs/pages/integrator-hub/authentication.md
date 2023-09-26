# Authentication

:::info

The build integrations section is best understood when read from beginning to end. To get the most value out of it, start from the first page and read through page by page.

1. [Overview page](/integrator-hub/overview)
2. [<mark>Auth</mark>](/integrator-hub/authentication)
3. [Triggers](/integrator-hub/triggers)
4. [Actions](/integrator-hub/actions)

:::

To proceed with building an integration, you will need to authenticate with the third-party service. This is done by creating API keys or OAuth credentials in the third-party service and then entering them into the integration builder.

:::tip 

till now we have only supported API key based authentication. We are working on adding OAuth support.

:::

## API Key Authentication

API key authentication is the simplest form of authentication. It involves creating an API key in the third-party service and then entering it into the integration builder.

### Configuring API key authentication in the integration builder

Set up authentication fields required for the third-party service in the integration builder. For example, if the third-party service requires an API key and a password, you will need to create two authentication fields in the integration builder. and you can set if a field is required or not.

for *Zendesk* and *DstnyEngage* you will need to create two authentication fields in the integration builder.
1. Screen Name
2. API Key

Next you will need to provide an endpoint that requires authentication, *Integratro Hub* will use this endpoint to verify the user-entered credentials, for example for *DstnyEngage* you can use `/customers` endpoint.
you can set any request headers required for the authentication, for example for *DstnyEngage* you will need to set 
`X-API-KEY`, and in Zendesk you will need to set `Authorization` header with value `Basic <base64 encoded email:password>`


### Accessing authentication fields in the integration code
Access the authentication fields in the integration code using our context object, `$.auth.data.fieldName`. For example, if you created an authentication field called `api_Key`, you can access it in the integration code using `$.auth.data.api_Key`.



### Adding A Connection

#### Creating An API key in Zendesk

1. Sign up for a Zendesk account.
2. Click the **Zendesk Products** icon in the top bar, then select **Admin Center**.
3. Click the **Apps and Integrations** > **Zendesk API** tab.
4. Enable both **Token Access** and **Password Access**.
5. Click **Add API key** and enter a name for the API key.
6. Click **Save**.

or you can authenticate using Basic Auth by entering your Zendesk username and password in base64 encoded format.

Same goes for *DstnyEngage* you can create an API key from the settings page.



