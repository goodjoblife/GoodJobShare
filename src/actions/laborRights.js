import contentfulUtils from '../utils/contentfulUtils';

export const SET_LABOR_RIGHTS_STATUS = '@@laborRights/SET_LABOR_RIGHTS_STATUS';
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

const setLaborRightsStatus = (nextStatus, err) => ({
  type: SET_LABOR_RIGHTS_STATUS,
  nextStatus,
  err,
});

export const loadLaborRights = () => dispatch => {
  dispatch(setLaborRightsStatus(status.FETCHING));
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
    dispatch(setLaborRightsStatus(status.FETCHED));
  }).catch(err => {
    dispatch(setLaborRightsStatus(status.ERROR, err));
  });
};
