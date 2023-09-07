import { IGlobalVariable } from '@automatisch/types';
  import verifyCredentials from './verify-credentials';

  const isStillVerified = async ($: IGlobalVariable) => {
    // Call the verifyCredentials function to ensure verification
    await verifyCredentials($);
    return true;
  };

  export default isStillVerified;
  