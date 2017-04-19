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
      fields: {
        title,
        description,
        content,
        coverImage: { fields: { file: { url: coverUrl } } },
        seoTitle,
        seoDescription,
        hidingText,
      },
    }) => ({
      id,
      title,
      description,
      content,
      coverUrl,
      seoTitle,
      seoDescription,
      hidingText,
    }))
  ).then(items => {
    dispatch(setLaborRights(items));
  }).catch(() => {});
