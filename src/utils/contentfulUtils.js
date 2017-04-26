import * as contentful from 'contentful';

const accessToken = process.env.CONTENTFUL_TOKEN
  || '9910d888663cf6ffdf6e52cd82e54e2c320fc4cc23af21b2d2d4ab69e90fcda9';
const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE || 'rhotsuly6hr2';

const client = contentful.createClient({
  accessToken,
  space,
});

export default {
  fetchLaborRights: () => client.getEntries({
    order: 'sys.createdAt',
  }),
};
