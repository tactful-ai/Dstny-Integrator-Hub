import verifyCredentials from './verify-credentials';
    import isStillVerified from './is-still-verified';

    export default {
      fields: [
        {
        key: 'field',
        label: 'field',
        type: 'string' as const,
        required: false,
        readOnly: false,
        description: '',
      },
      ],
      verifyCredentials,
      isStillVerified,
    };
    