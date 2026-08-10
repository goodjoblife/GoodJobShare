import { useCallback } from 'react';

import {
  deleteReplyLikes as deleteReplyLikesApi,
  postReplyLikes as postReplyLikesApi,
} from 'apis/experiencesApi';
import { useToken } from 'hooks/auth';

const useLikeReply = () => {
  const token = useToken();
  return useCallback(
    async reply => {
      const { id: replyId, liked } = reply;
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
