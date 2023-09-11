import verifyCredentials from './verify-credentials';
    import isStillVerified from './is-still-verified';

    export default {
      fields: [
        {
        key: 'screenName',
        label: 'Screen Name',
        type: 'string' as const,
        required: true,
        readOnly: false,
        value: null,
        placeholder: null,
        description: 'Screen name of your connection to be used on Automatisch UI.',
        clickToCopy: false,
      },
{
        key: 'api_key',
        label: 'API Key',
        type: 'string' as const,
        required: true,
        readOnly: false,
        value: null,
        placeholder: null,
        description: 'API key of Zendesk API service.',
        clickToCopy: false,
      },
      ],
      verifyCredentials,
      isStillVerified,
    };
    