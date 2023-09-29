# API

Automatisch uses graphql API to perfom all the operations. 

```typescript
import mutationResolvers from './mutation-resolvers';
import queryResolvers from './query-resolvers';

const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
};

export default resolvers;
```
`/workspace/packages/backend/src/graphql/resolvers.ts`

keep in mind that the graphql API is a single endpoint that you can use to perform all the operations at `/graphql`
You can find the graphql schema and documentation at [`/graphql`](http://20.163.117.231:3000/graphql)

For the Integrator-hub, we use REST API to perform operations. Our Swagger API documentation is available at [`/docs`](http://20.163.117.231:3000/docs)

