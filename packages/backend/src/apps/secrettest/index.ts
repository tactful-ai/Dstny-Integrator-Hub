
import defineApp from '../../helpers/define-app';
import auth from './auth';
import addAuthHeaders from './common/add-headers';

const appConfig = {
  beforeRequest: [addAuthHeaders],
  auth,
  name: "test3",
  key: "secrettest",
  iconUrl: "{BASE_URL}/apps/secrettest/assets/favicon.svg",
  authDocUrl: "https://automatisch.io/docs/apps/secrettest/connection",
  supportsConnections: true,
  baseUrl: "http://google.com",
  apiBaseUrl: "http://google.com",
  primaryColor: "000000",
};

export default defineApp(appConfig);
  