
import defineApp from '../../helpers/define-app';
import auth from './auth';
import addAuthHeaders from './common/add-headers';

const appConfig = {
  beforeRequest: [addAuthHeaders],
  auth,
  name: "test2",
  key: "secret",
  iconUrl: "{BASE_URL}/apps/secret/assets/favicon.svg",
  authDocUrl: "https://automatisch.io/docs/apps/secret/connection",
  supportsConnections: true,
  baseUrl: "http://google.com",
  apiBaseUrl: "http://google.com",
  primaryColor: "000000",
};

export default defineApp(appConfig);
  