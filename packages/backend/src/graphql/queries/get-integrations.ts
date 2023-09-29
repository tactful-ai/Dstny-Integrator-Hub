import AppConfig from '../../models/app-config';
import Context from '../../types/express/context';

type Params = {
  userId: string;
};

const getIntegrations = async (_parent: unknown, params: Params, context: Context) => {
  context.currentUser.can('create', 'Connection');

  const appConfigs = await AppConfig
    .query()
    .withGraphFetched({
      appAuthClients: true,
      users: true
    })
    .where('user_id', params.userId) 
    .returning('*'); 

    console.log(appConfigs)
  return appConfigs; 
};

export default getIntegrations;
