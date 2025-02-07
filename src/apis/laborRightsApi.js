import graphqlClient from 'utils/graphqlClient';
import { queryLaborRightsGql, queryLaborRightGql } from 'graphql/laborRight';

export const queryLaborRightMenu = () =>
  graphqlClient({
    query: queryLaborRightsGql,
  }).then(data => data.labor_rights);

export const queryLaborRight = ({ entryId }) =>
  graphqlClient({
    query: queryLaborRightGql,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);
