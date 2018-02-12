import fetchUtil from '../utils/fetchUtil';
import status from '../constants/status';

export const SET_MY_EXPERIENCES = 'SET_MY_EXPERIENCES';
export const SET_MY_EXPERIENCES_STATUS = 'SET_MY_EXPERIENCES_STATUS';
export const SET_MY_WORKINGS = 'SET_MY_WORKINGS';
export const SET_MY_WORKINGS_STATUS = 'SET_MY_WORKINGS_STATUS';
export const SET_MY_REPLIES = 'SET_MY_REPLIES';
export const SET_MY_REPLIES_STATUS = 'SET_MY_REPLIES_STATUS';
export const SET_MY_PERMISSION = 'SET_MY_PERMISSION';

const getIndex = (ary, id) => ary.map(e => e._id).indexOf(id);

export const setMyExperiences = (myExperiences, err) => ({
  type: SET_MY_EXPERIENCES,
  myExperiencesStatus: err ? status.ERROR : status.FETCHED,
  myExperiencesError: err,
  myExperiences,
});

export const setMyWorkings = (myWorkings, err) => ({
  type: SET_MY_WORKINGS,
  myWorkingsStatus: err ? status.ERROR : status.FETCHED,
  myWorkingsError: err,
  myWorkings,
});

export const setMyReplies = (myReplies, err) => ({
  type: SET_MY_REPLIES,
  myRepliesStatus: err ? status.ERROR : status.FETCHED,
  myRepliesError: err,
  myReplies,
});

export const setMyPermission = ({ permission, location }, err) => ({
  type: SET_MY_PERMISSION,
  permission,
  location,
  fetchPermissionError: err,
});

export const fetchMyExperiences = () => dispatch => {
  dispatch({
    type: SET_MY_EXPERIENCES_STATUS,
    status: status.FETCHING,
  });

  return fetchUtil('/me/experiences')('GET')
    .then(result => {
      if (result.error) {
        dispatch(setMyExperiences({}, result.error));
        return;
      }
      dispatch(setMyExperiences(result, null));
    })
    .catch(error => {
      dispatch(setMyExperiences({}, error));
    });
};

export const fetchMyWorkings = () => dispatch => {
  dispatch({
    type: SET_MY_WORKINGS_STATUS,
    status: status.FETCHING,
  });

  return fetchUtil('/me/workings')('GET')
    .then(result => {
      if (result.error) {
        dispatch(setMyWorkings({}, result.error));
        return;
      }
      dispatch(setMyWorkings(result, null));
    })
    .catch(error => {
      dispatch(setMyWorkings({}, error));
    });
};

export const fetchMyReplies = () => dispatch => {
  dispatch({
    type: SET_MY_REPLIES_STATUS,
    status: status.FETCHING,
  });

  return fetchUtil('/me/replies')('GET')
    .then(result => {
      if (result.error) {
        dispatch(setMyReplies({}, result.error));
        return;
      }
      dispatch(setMyReplies(result, null));
    })
    .catch(error => {
      dispatch(setMyReplies({}, error));
    });
};

export const setExperienceStatus = o => (dispatch, getState) => {
  const data = getState().me.toJS();
  let experiences = data.myExperiences.experiences;
  const index = getIndex(experiences, o._id);

  return fetchUtil(`/experiences/${o._id}`)('PATCH', {
    status: o.status === 'published' ? 'hidden' : 'published',
  }).then(result => {
    if (result.success) {
      experiences = [
        ...experiences.slice(0, index),
        Object.assign({}, o, {
          status: result.status,
        }),
        ...experiences.slice(index + 1),
      ];
      dispatch(setMyExperiences(
        Object.assign(data.myExperiences, { experiences }),
        null
      ));
      return;
    }
    dispatch(setMyExperiences(experiences, null));
  });
};

export const setWorkingStatus = o => (dispatch, getState) => {
  const data = getState().me.toJS();
  let workings = data.myWorkings.time_and_salary;
  const index = getIndex(workings, o._id);

  return fetchUtil(`/workings/${o._id}`)('PATCH', {
    status: o.status === 'published' ? 'hidden' : 'published',
  }).then(result => {
    if (result.success) {
      workings = [
        ...workings.slice(0, index),
        Object.assign({}, o, {
          status: result.status,
        }),
        ...workings.slice(index + 1),
      ];
      dispatch(setMyWorkings(
        Object.assign(data.myWorkings, {
          time_and_salary: workings,
        }),
        null
      ));
      return;
    }
    dispatch(setMyWorkings(workings, null));
  });
};

export const setReplyStatus = o => (dispatch, getState) => {
  const data = getState().me.toJS();
  let replies = data.myReplies.replies;
  const index = getIndex(replies, o._id);

  return fetchUtil(`/replies/${o._id}`)('PATCH', {
    status: o.status === 'published' ? 'hidden' : 'published',
  }).then(result => {
    if (result.success) {
      replies = [
        ...replies.slice(0, index),
        Object.assign({}, o, {
          status: result.status,
        }),
        ...replies.slice(index + 1),
      ];
      dispatch(setMyReplies(
        Object.assign(data.myReplies, { replies }),
        null
      ));
      return;
    }
    dispatch(setMyReplies(replies, null));
  });
};

export const fetchMyPermission = () => (dispatch, getState) =>
  fetchUtil('/me/permissions/search')('GET').then(result => {
    dispatch(setMyPermission({
      permission: result.hasSearchPermission,
      location: getState().routing.locationBeforeTransitions,
    }, null));
  }).catch(error => {
    dispatch(setMyPermission({}, error));
  });
