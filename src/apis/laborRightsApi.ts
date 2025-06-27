import graphqlClient from 'utils/graphqlClient';
import {
  queryLaborRightsMenuGql,
  queryLaborRightsGql,
} from 'graphql/laborRight';
// todo

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
export type LaborRightMenuEntry = {
  id: string;
  title: string;
  coverUrl: string | null;
};
export type LaborRightEntry = {
  id: string;
  title: string;
  order: number | null;
  description: string;
  content: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoText: string | null;
  coverUrl: string | null;
  nPublicPages: number | null;
  descriptionInPermissionBlock: string | null;
};
