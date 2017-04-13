import * as contentful from 'contentful';

export const SET_LABOR_RIGHTS = 'SET_LABOR_RIGHTS';

const setLaborRights = items => ({
  type: SET_LABOR_RIGHTS,
  items,
});

export const loadLaborRights = () => dispatch => {
  const SPACE_ID = 'siutzcg6nl4g';
  const ACCESS_TOKEN = process.env.CONTENTFUL_TOKEN;

  const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN,
  });

  return client.getEntries().then(({ items }) =>
    items.map(({
      sys: { id },
      fields: { title, cover_photo: { fields: { file: { url } } } },
    }) => ({
      id,
      title,
      coverUrl: url,
    }))
  ).then(items => {
    dispatch(setLaborRights(items));
  }).catch(() => {});
};
