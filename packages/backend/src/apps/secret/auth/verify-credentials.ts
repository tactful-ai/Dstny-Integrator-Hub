
import { IGlobalVariable } from '@automatisch/types';

const verifyCredentials = async ($: IGlobalVariable) => {
  await $.http.get('https://google.com');

  const authData = {
    screenName: $.auth.data.screenName,
    api_key: $.auth.data.api_key,
  };

  await $.auth.set(authData);
};

export default verifyCredentials;
  