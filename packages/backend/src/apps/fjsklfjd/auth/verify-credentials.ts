
import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('https://google.com');

  const authData = {
    testfield: $.auth.data.testfield,
  };

  await $.auth.set(authData);
};

export default verifyCredentials;
  