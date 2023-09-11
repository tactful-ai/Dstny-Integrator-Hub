import verifyCredentials from './verify-credentials';
    import isStillVerified from './is-still-verified';

    export default {
      fields: [
        {
        key: 'field',
        label: 'field1',
        type: 'string' as const,
        required: true,
        readOnly: true,
        description: '',
      },
      ],
      verifyCredentials,
      isStillVerified,
    };
    