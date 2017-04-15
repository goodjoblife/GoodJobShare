import * as contentful from 'contentful';

export default (space, accessToken, entry) => {
  const client = contentful.createClient({
    space,
    accessToken,
  });

  if (entry) {
    return client.getEntry(entry);
  }

  return client.getEntries();
};
