import * as contentful from 'contentful';

function initClient() {
  const accessToken = process.env.CONTENTFUL_TOKEN;
  const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE;

  return contentful.createClient({
    accessToken,
    space,
  });
}

export default {
  fetchLaborRights: () => {
    const client = initClient();
    return client.getEntries();
  },
};
