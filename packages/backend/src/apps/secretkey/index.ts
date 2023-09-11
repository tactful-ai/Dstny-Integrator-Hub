
import defineApp from '../../helpers/define-app';

const appConfig = {
  name: "oepwepoi",
  key: "secretkey",
  iconUrl: "{BASE_URL}/apps/secretkey/assets/favicon.svg",
  authDocUrl: "https://automatisch.io/docs/apps/secretkey/connection",
  supportsConnections: true,
  baseUrl: "http://google.com",
  apiBaseUrl: "http://google.com",
  primaryColor: "000000",
};

export default defineApp(appConfig);
  