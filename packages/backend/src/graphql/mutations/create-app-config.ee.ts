import App from '../../models/app';
import AppConfig from '../../models/app-config';
import Context from '../../types/express/context';

type Params = {
  input: {
    key: string;
    name?: string; 
    base_url?: string;
    api_base_url?: string;
    primary_color?: string;
    icon_url?: string;
    auth_doc_url?: string;
    user_id?: string;
    allowCustomConnection?: boolean;
    shared?: boolean;
    disabled?: boolean;
  };
};

const createAppConfig = async (
  _parent: unknown,
  params: Params,
  context: Context
) => {
  context.currentUser.can('update', 'App');

  const key = params.input.key;

  const app = await App.findOneByKey(key);

  if (!app) throw new Error('The app cannot be found!');

  const appConfig = await AppConfig.query().insert(params.input);

  return appConfig;
};

export default createAppConfig;
