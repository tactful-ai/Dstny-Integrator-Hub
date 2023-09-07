
import { TBeforeRequest } from '@automatisch/types';

const addAuthHeaders: TBeforeRequest = ($, requestConfig) => {
  if (requestConfig.headers) {
    if ($.auth.data) {
      requestConfig.headers['Authorization'] = 'Basic bW9hei5lbHNheWVkMDAyQGdtYWlsLmNvbTpxOUp4U1x3RlY2RXpcP1p7LVBnSGF+PW1d';
    }
  } 
  return requestConfig;
};

export default addAuthHeaders;
  