import * as contentful from 'contentful';

const accessToken = process.env.CONTENTFUL_TOKEN
  || '92728b01e5f9536eccb6d4caff0ea92561bc1c742faea65732690f38f5840426';
const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE || 'rbeukh8vheqy';

const client = contentful.createClient({
  accessToken,
  space,
});

export default {
  fetchLaborRights: () => client.getEntries({
    order: 'sys.createdAt',
  }),
};
