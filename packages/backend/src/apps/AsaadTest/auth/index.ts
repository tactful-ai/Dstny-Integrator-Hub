import verifyCredentials from './verify-credentials';
    import isStillVerified from './is-still-verified';

    export default {
      fields: [
        {
        key: 'Asaad',
        label: 'Ahmed',
        type: 'string' as const,
        required: true,
        readOnly: false,
        description: '',
      },
      ],
      verifyCredentials,
      isStillVerified,
    };
    