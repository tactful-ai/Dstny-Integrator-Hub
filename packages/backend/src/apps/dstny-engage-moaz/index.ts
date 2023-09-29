import defineApp from '../../helpers/define-app';
import triggers from './triggers'
import actions from './actions'

export default defineApp({
  name: 'Dstny Engage moaz',
  key: 'dstny-engage-moaz',
  iconUrl: '{BASE_URL}/apps/dstny-engage/assets/favicon.svg',
  authDocUrl: 'https://automatisch.io/docs/apps/dstnyengage/connection',
  supportsConnections: true,
  baseUrl: 'https://dstnyengage.com',
  apiBaseUrl: 'https://erp.alpha.dev.tactful.ai/erp',
  primaryColor: '000000',
  triggers,
  actions
});
