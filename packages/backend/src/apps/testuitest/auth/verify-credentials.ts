
import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('https://google.com');

  const authData = {
    field: $.auth.data.field,
  };

  await $.auth.set(authData);
};

export default verifyCredentials;
  