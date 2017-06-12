import fetchUtil from '../utils/fetchUtil';
import status from '../constants/status';

export const SET_EXPERIENCE = '@@experienceDetail/SET_EXPERIENCE';
export const SET_TOS = '@@experienceDetail/SET_TOS';
export const SET_COMMENT = '@@experienceDetail/SET_COMMENT';
export const SET_REPLY_STATUS = '@@experienceDetail/SET_REPLY_STATUS';
export const SET_REPLIES = '@@experienceDetail/SET_REPLIES';
export const LIKE_REPLY = '@@experienceDetail/LIKE_REPLY';

const getIndex = (ary, id) => ary.map(e => e._id).indexOf(id);

export const setExperience = experience => ({
  type: SET_EXPERIENCE,
  experienceStatus: status.FETCHED,
  experienceError: null,
  experience,
});

export const setTos = () => ({
  type: SET_TOS,
  // tos: e.target.value,
});

export const setComment = e => ({
  type: SET_COMMENT,
  comment: e.target.value,
});

export const setReplies = replies => ({
  type: SET_REPLIES,
  replyStatus: status.FETCHED,
  replyError: null,
  replies,
});

export const submitComment = id => (dispatch, getState) => {
  const data = getState().experienceDetail.toJS();
  const replies = data.replies;

  return fetchUtil(`/experiences/${id}/replies`)('POST', {
    content: data.comment,
  })
    .then(result => {
      dispatch(setReplies([...replies, result.reply]));
    });
    // .catch(() => {
    //   dispatch(setReplies(replies));
    // });
};

export const likeReply = o => (dispatch, getState) => {
  const data = getState().experienceDetail.toJS();
  const replies = data.replies;
  const index = getIndex(replies, o._id);

  if (o.liked) {
    return fetchUtil(`/replies/${o._id}/likes`)('DELETE')
      .then(result => {
        if (result.success) {
          dispatch(setReplies([
            ...replies.slice(0, index),
            Object.assign({}, o, {
              liked: false,
              like_count: o.like_count - 1,
            }),
            ...replies.slice(index + 1),
          ]));
        }
        dispatch(setReplies(replies));
      });
      // .catch(error => {
      //   dispatch(setReplies(replies));
      // });
  }

  return fetchUtil(`/replies/${o._id}/likes`)('POST')
    .then(result => {
      if (result.success) {
        dispatch(setReplies([
          ...replies.slice(0, index),
          Object.assign({}, o, {
            liked: true,
            like_count: o.like_count + 1,
          }),
          ...replies.slice(index + 1),
        ]));
      }
      dispatch(setReplies(replies));
    });
    // .catch(error => {
    //   dispatch(setReplies(replies));
    // });
};

export const fetchExperience = id => dispatch => {
  dispatch({
    type: SET_EXPERIENCE,
    replyStatus: status.FETCHING,
  });

  return fetchUtil(`/experiences/${id}`)('GET')
    .then(result => {
      dispatch(setExperience(result));
    })
    .catch(error => {
      dispatch({
        type: SET_EXPERIENCE,
        experienceStatus: status.ERROR,
        experienceError: error,
        experience: {},
      });
    });
};

export const fetchReplies = () => dispatch => {
  const mock = [
    {
      _id: 'xxxxxx',
      content: '我是留言內容',
      like_count: 0,
      report_count: 1,
      liked: false,
      created_at: '2016-03-10T00:00:00.000Z',
      floor: 1,
    },
    {
      _id: 'ooooo',
      content: 'hihi',
      like_count: 100,
      report_count: 0,
      liked: true,
      created_at: '2016-03-11T00:00:00.000Z',
      floor: 2,
    },
  ];

  dispatch(setReplies(mock));
};

export const fetchReplies2 = id => dispatch => {
  dispatch({
    type: SET_REPLY_STATUS,
    replyStatus: status.FETCHING,
  });

  return fetchUtil(`/experiences/${id}/replies`)('GET')
    .then(result => {
      dispatch(setReplies(result.replies));
    })
    .catch(error => {
      dispatch({
        type: SET_REPLIES,
        replyStatus: status.ERROR,
        replyError: error,
        replies: [],
      });
    });
};
