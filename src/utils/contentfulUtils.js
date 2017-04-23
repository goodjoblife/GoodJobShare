import * as contentful from 'contentful';

const accessToken = process.env.CONTENTFUL_TOKEN;
const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE;

const client = contentful.createClient({
  accessToken,
  space,
});

export default {
  fetchAllLaborRightsMeta: () => client.getEntries({
    order: 'sys.createdAt',
    content_type: 'labor-lecture',
    select: 'fields.title,fields.coverImage',
  }),
  fetchSingleLaborRights: laborRightsId => client.getEntries({
    content_type: 'labor-lecture',
    'sys.id': laborRightsId,
  }),
};
