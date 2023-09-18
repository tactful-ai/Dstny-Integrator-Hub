import { gql } from '@apollo/client';

export const GET_INTEGRATIONS = gql`
    query GetIntegrations($userId: String!) {
    getIntegrations(userId: $userId) {
      id
      key
      name
    }
  }

`