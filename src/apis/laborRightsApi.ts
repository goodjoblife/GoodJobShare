import graphqlClient from 'utils/graphqlClient';
import {
  queryLaborRightsMenuGql,
  queryLaborRightsGql,
} from 'graphql/laborRight';
import { LaborRightMenuEntry, LaborRightEntry } from 'reducers/laborRights';

export const queryLaborRightsMenu = (): Promise<LaborRightMenuEntry[]> =>
  graphqlClient<{
    labor_rights: LaborRightMenuEntry[];
  }>({
    query: queryLaborRightsMenuGql,
  }).then(data => data.labor_rights);

export default queryLaborRightsMenu;

export const queryLaborRights = ({
  entryId,
}: {
  entryId: string;
}): Promise<LaborRightEntry> =>
  graphqlClient<{
    labor_right: LaborRightEntry;
  }>({
    query: queryLaborRightsGql,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);
