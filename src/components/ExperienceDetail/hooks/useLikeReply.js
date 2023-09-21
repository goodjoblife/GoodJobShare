import { useCallback } from 'react';
import { useToken } from 'hooks/auth';
import {
  deleteReplyLikes as deleteReplyLikesApi,
  postReplyLikes as postReplyLikesApi,
} from 'apis/experiencesApi';

const useLikeReply = () => {
  const token = useToken();
  return useCallback(
    async reply => {
      const { _id: replyId, liked } = reply;
      if (liked) {
        await deleteReplyLikesApi({ id: replyId, token });
      } else {
        await postReplyLikesApi({ id: replyId, token });
      }
    },
    [token],
  );
};

export default useLikeReply;
