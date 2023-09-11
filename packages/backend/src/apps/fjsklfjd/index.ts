
import defineApp from '../../helpers/define-app';
import auth from './auth';
import addAuthHeaders from './common/add-headers';

const appConfig = {
  beforeRequest: [addAuthHeaders],
  auth,
  name: "MoazTest",
  key: "fjsklfjd",
  iconUrl: "{BASE_URL}/apps/fjsklfjd/assets/favicon.svg",
  authDocUrl: "https://automatisch.io/docs/apps/fjsklfjd/connection",
  supportsConnections: true,
  baseUrl: "http://google.com",
  apiBaseUrl: "http://google.com",
  primaryColor: "000000",
};

export default defineApp(appConfig);
  