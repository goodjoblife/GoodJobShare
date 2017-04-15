import fetchContentfulData from '../utils/fetch-contentful-data';

export const SET_LABOR_RIGHTS = 'SET_LABOR_RIGHTS';

const setLaborRights = items => ({
  type: SET_LABOR_RIGHTS,
  items,
});

export const loadLaborRights = () => dispatch => {
  const space = 'siutzcg6nl4g';
  const accessToken = process.env.CONTENTFUL_TOKEN;
  return fetchContentfulData(space, accessToken).then(({ items }) =>
    items.map(({
      sys: { id },
      fields: { title, content, cover_photo: { fields: { file: { url } } } },
    }) => ({
      id,
      title,
      content,
      coverUrl: url,
    }))
  ).then(items => {
    dispatch(setLaborRights(items));
  }).catch(() => {});
};
