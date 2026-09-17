import { useCallback } from 'react';

import createReplyLikeApi from 'apis/createReplyLike';
import deleteReplyLikeApi from 'apis/deleteReplyLike';
import { useToken } from 'hooks/auth';

const useLikeReply = () => {
  const token = useToken();
  return useCallback(
    async reply => {
      const { id: replyId, liked } = reply;
      if (liked) {
        await deleteReplyLikeApi({ id: replyId, token });
      } else {
        await createReplyLikeApi({ id: replyId, token });
      }
    },
    [token],
  );
};

export default useLikeReply;
