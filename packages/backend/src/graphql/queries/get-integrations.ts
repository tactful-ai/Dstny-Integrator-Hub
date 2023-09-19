
import AppConfig from '../../models/app-config';
import Context from '../../types/express/context';

type Params = {
  userId: string;
};

const getIntegrations = async (_parent: unknown, params: Params, context: Context) => {
  context.currentUser.can('create', 'Connection');

  const appConfig = await AppConfig
    .query()
    .withGraphFetched({
      appAuthClients: true,
      users: true
    })
    .findOne({
      user_id: params.userId
    });

  return appConfig;
};

export default getIntegrations;
