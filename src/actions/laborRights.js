import contentfulUtils from '../utils/contentfulUtils';

export const SET_LABOR_RIGHTS = 'SET_LABOR_RIGHTS';

const setLaborRights = items => ({
  type: SET_LABOR_RIGHTS,
  items,
});

export const loadLaborRights = () => dispatch =>
  contentfulUtils.fetchLaborRights().then(({ items }) =>
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
