import AppConfig from '../../models/app-config';
import Context from '../../types/express/context';

type Params = {
  input: {
    id: string;
    allowCustomConnection?: boolean;
    shared?: boolean;
    disabled?: boolean;
    name?: string;
    base_url?: string;
    api_base_url?: string;
    primary_color?: string;
    icon_url?: string;
    auth_doc_url?: string;
    user_id?: string;
  };
};

const updateAppConfig = async (
  _parent: unknown,
  params: Params,
  context: Context
) => {
  context.currentUser.can('update', 'App');

  const {
    id,
    ...appConfigToUpdate
  } = params.input;

  const appConfig = await AppConfig
    .query()
    .findById(id)
    .throwIfNotFound();

  await appConfig
    .$query()
    .patch(
      appConfigToUpdate
    );

  return appConfig;
};

export default updateAppConfig;
