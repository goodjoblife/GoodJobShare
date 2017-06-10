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

export const fetchExperienceMock = _id =>
  dispatch => {
    const experience = {
      _id,
      type: 'interview',
      company: {
        name: '日月光半導體製造股份有限公司',
      },
      job_title: '半導體製程工程師',
      sections: [
        {
          subtitle: '',
          content: `是個很有特色的面試，或許也因為是新創公司吧
開始就直接是老闆來面試
一樣介紹完自己的背景跟動機之後就是老闆介紹公司
未來工作機會除公司本身的平台之外，因為也有接外面的整合行銷案子
所以也會要做一些event page

老闆也開宗明義地說自己的風格比較美式、直接
所以目前公司的經營狀態都會直接跟員工溝通
整個氛圍相對也比較自由
也說明因為公司也有一位資深的工程師
如果有機會進來能夠手把手的帶
算是對我來說最大的優點

有問我目前是不是有offer，對方開多少
老闆有提到也因為是新創公司
所以相對沒辦法像是外面有規模的公司給薪水這麼豪邁，也頂多跟其他offer差不多
但如果當月公司有盈餘賺錢的話也會撥一部分當作獎金 不過就看狀況
同時也會希望我能的話自備電腦`,
        },
      ],
    };

    dispatch(setExperience(experience));
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
