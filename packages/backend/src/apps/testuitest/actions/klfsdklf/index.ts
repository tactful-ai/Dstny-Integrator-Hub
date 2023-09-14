
import { IJSONObject } from '@automatisch/types';
import defineActions from '../../../../helpers/define-action';

export default defineActions({
  name: 'safsdfasdf',
  key: 'klfsdklf',
  description: 'qwqwqwq',
  arguments: [
  {
    "label": "fsjkdlfds",
    "key": "jioruweriouw",
    "type": "string",
    "required": true,
    "description": "kfjsdlfj",
    "variables": true
  }
],

  async run($) {
    const requestPath = `/customers/${$.step.parameters.id}`;

const headers = {
  'X-API-KEY': $.auth.data.authToken as string,
};

const response = await $.http.delete(
  requestPath,
);

$.setActionItem({ raw: response.data });
  },
});
