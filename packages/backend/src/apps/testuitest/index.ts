
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
  name: "",
  key: "testuitest",
  iconUrl: "{BASE_URL}/apps/testuitest/assets/favicon.svg",
  authDocUrl: "https://automatisch.io/docs/apps/testuitest/connection",
  supportsConnections: true,
  baseUrl: "http://google.com",
  apiBaseUrl: "http://google.com",
  primaryColor: "000000",
};

export default defineApp(appConfig);
  