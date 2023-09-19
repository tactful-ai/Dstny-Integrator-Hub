import { gql } from '@apollo/client';

export const GET_TRIGGERS = gql`
  query GetTriggers($appKey: String!) {
    getApp(key: $appKey) {
      triggers {
        name
        type
        description
      }
    }
  }
`;
