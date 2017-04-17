import contentfulUtils from '../utils/contentfulUtils';

export const FETCH_LABOR_RIGHTS = '@@laborRights/FETCH_LABOR_RIGHTS';
export const SET_LABOR_RIGHTS = '@@laborRights/SET_LABOR_RIGHTS';

export const status = {
  UNFETCHED: 'UNFETCHED',
  FETCHED: 'FETCHED',
  FETCHING: 'FETCHING',
};

const setLaborRights = items => ({
  type: SET_LABOR_RIGHTS,
  items,
});

const fetchLaborRights = (done, err) => ({
  type: FETCH_LABOR_RIGHTS,
  done,
  err,
});

export const loadLaborRights = () => dispatch => {
  dispatch(fetchLaborRights(false));
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
    dispatch(fetchLaborRights(true));
  }).catch(err => {
    dispatch(fetchLaborRights(true, err));
  });
};
