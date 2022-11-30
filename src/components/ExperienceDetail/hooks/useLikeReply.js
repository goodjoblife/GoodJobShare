import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import api from '../../../apis';

const useLikeReply = () => {
  const token = useToken();
  return useAsyncFn(
    async reply => {
      const { _id: replyId, liked } = reply;
      if (liked) {
        await api.experiences.deleteReplyLikes({ id: replyId, token });
      } else {
        await api.experiences.postReplyLikes({ id: replyId, token });
      }
    },
    [token],
  );
};

export default useLikeReply;
