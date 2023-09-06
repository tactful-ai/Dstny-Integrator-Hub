
import defineApp from '../../helpers/define-app';
import auth from './auth';
import addAuthHeaders from './common/add-headers';
import triggers from './triggers';
import actions from './actions';

const appConfig = {
  actions,
  triggers,
  beforeRequest: [addAuthHeaders],
  auth,
  name: "Zendesk",
  key: "zendesk",
  iconUrl: "{BASE_URL}/apps/dstny-engage/assets/favicon.svg",
  authDocUrl: "https://automatisch.io/docs/apps/zendesk/connection",
  supportsConnections: true,
  baseUrl: "https://dstny5561.zendesk.com",
  apiBaseUrl: "https://dstny5561.zendesk.com/api/v2",
  primaryColor: "000000",
};

export default defineApp(appConfig);
  