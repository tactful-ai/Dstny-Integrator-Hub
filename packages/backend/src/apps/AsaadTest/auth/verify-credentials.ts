
import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('https://google.com');

  const authData = {
    Asaad: $.auth.data.Asaad,
  };

  await $.auth.set(authData);
};

export default verifyCredentials;
  