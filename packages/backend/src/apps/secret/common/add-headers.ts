
import { TBeforeRequest } from '@automatisch/types';

const addAuthHeaders: TBeforeRequest = ($, requestConfig) => {
  if (requestConfig.headers) {
    if ($.auth.data) {
      requestConfig.headers['Authorization'] = `Basic ${$.auth.data.api_key}`;
    }
  } 
  return requestConfig;
};

export default addAuthHeaders;
  