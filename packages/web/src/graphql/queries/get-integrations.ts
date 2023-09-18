import { gql } from '@apollo/client';

export const GET_INTEGRATIONS = gql`
    query GetConnectedApps($name: String) {
    getConnectedApps(name: $name) {
      key
      name
      iconUrl
      docUrl
      primaryColor
      connectionCount
      flowCount
      supportsConnections
    }
  }

`