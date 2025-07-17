import graphqlClient from 'utils/graphqlClient';
import {
  queryLaborRightsMenuGql,
  QueryLaborRightsMenuData,
  LaborRightMenuEntry,
  queryLaborRightsGql,
  QueryLaborRightsData,
  LaborRightEntry,
} from 'graphql/laborRight';

export const queryLaborRightsMenu = (): Promise<LaborRightMenuEntry[]> =>
  graphqlClient<QueryLaborRightsMenuData>({
    query: queryLaborRightsMenuGql,
  }).then(data => data.labor_rights);

export const queryLaborRights = ({
  entryId,
}: {
  entryId: string;
}): Promise<LaborRightEntry | null> =>
  graphqlClient<QueryLaborRightsData>({
    query: queryLaborRightsGql,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);
