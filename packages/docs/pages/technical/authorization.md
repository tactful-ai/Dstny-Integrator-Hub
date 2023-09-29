# Authorization

For Authorization the application uses RBAC (Role Based Access Control). This means that you can assign roles to users and these roles determine what the user can do in the application.

the application uses a packae called [casl](https://stalniy.github.io/casl/) to implement RBAC.

```typescript
import { PureAbility, fieldPatternMatcher, mongoQueryMatcher } from '@casl/ability';
import { IUser } from '@automatisch/types';

// Must be kept in sync with `packages/backend/src/helpers/user-ability.ts`!
export default function userAbility(user: IUser) {
  const permissions = user?.permissions;
  const role = user?.role;

  // We're not using mongo, but our fields, conditions match
  const options = {
    conditionsMatcher: mongoQueryMatcher,
    fieldMatcher: fieldPatternMatcher
  };

  if (!role || !permissions) {
    return new PureAbility([], options);
  }

  return new PureAbility<[string, string], string[]>(permissions, options);
}
```
`/workspace/packages/web/src/helpers/userAbility.ts`


### permissions table
|                                      id                                      |                                      role_id                                      |  action  |     subject      | conditions |          created_at           |          updated_at          |
|------------------------------------------------------------------------------|---------------------------------------------------------------------------------|----------|------------------|------------|-------------------------------|------------------------------|
|                                                                              |                                                                                 |  create  | Connection       | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | Connection       | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  delete  | Connection       | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | Connection       | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | Execution        | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  create  | Flow             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  delete  | Flow             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  publish | Flow             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | Flow             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | Flow             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  create  | User             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | User             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  delete  | User             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | User             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  create  | Role             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | Role             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  delete  | Role             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | Role             | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  create  | SamlAuthProvider | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | SamlAuthProvider | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  delete  | SamlAuthProvider | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | SamlAuthProvider | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | Config           | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  create  | App              | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  read    | App              | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  delete  | App              | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |
|                                                                              |                                                                                 |  update  | App              | []         | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |


### roles table
|                                      id                                      |  name  |  key  | description |          created_at           |          updated_at          |
|------------------------------------------------------------------------------|-------|-------|-------------|-------------------------------|------------------------------|
|                                                                              | Admin | admin |             | 2023-09-21 16:09:11.680526+00 | 2023-09-21 16:09:11.680526+00 |

the appication uses `Can` function to check if the user has the permission to perform the action on the subject.

Example: create flow mutation

```typescript
const createFlow = async (
  _parent: unknown,
  params: Params,
  context: Context
) => {
  context.currentUser.can('create', 'Flow');

  const connectionId = params?.input?.connectionId;
  const appKey = params?.input?.triggerAppKey;

  if (appKey) {
    await App.findOneByKey(appKey);
  }

  const flow = await context.currentUser.$relatedQuery('flows').insert({
    name: 'Name your flow',
  });

  if (connectionId) {
    const hasConnection = await context.currentUser
      .$relatedQuery('connections')
      .findById(connectionId);

    if (!hasConnection) {
      throw new Error('The connection does not exist!');
    }
  }

  await Step.query().insert({
    flowId: flow.id,
    type: 'trigger',
    position: 1,
    appKey,
    connectionId,
  });

  await Step.query().insert({
    flowId: flow.id,
    type: 'action',
    position: 2,
  });

  return flow;
};
```