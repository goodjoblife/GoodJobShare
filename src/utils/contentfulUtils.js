import * as contentful from 'contentful';

const accessToken = process.env.CONTENTFUL_TOKEN;
const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE;

const client = contentful.createClient({
  accessToken,
  space,
});

export default {
  fetchLaborRights: () => client.getEntries({
    order: 'sys.createdAt',
  }),
};
