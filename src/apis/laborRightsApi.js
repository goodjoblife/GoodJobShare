import graphqlClient from 'utils/graphqlClient';
import {
  queryLaborRightsMenuGql,
  queryLaborRightsGql,
} from 'graphql/laborRight';

export const queryLaborRightsMenu = () =>
  graphqlClient({
    query: queryLaborRightsMenuGql,
  }).then(data => data.labor_rights);

export const queryLaborRights = ({ entryId }) =>
  graphqlClient({
    query: queryLaborRightsGql,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);
