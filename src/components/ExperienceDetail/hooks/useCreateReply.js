import { useCallback } from 'react';
<<<<<<< HEAD
import { useToken } from 'hooks/auth';
import api from '../../../apis';

const useCreateReply = experienceId => {
  const token = useToken();
  return useCallback(
    comment =>
      api.experiences.postExperienceReply({
        id: experienceId,
        comment,
        token,
      }),
    [experienceId, token],
  );
=======
import { useDispatch } from 'react-redux';
import { createReply } from 'actions/experienceDetail';

const useCreateReply = experienceId => {
  const dispatch = useDispatch();
  return useCallback(comment => dispatch(createReply(experienceId, comment)), [
    dispatch,
    experienceId,
  ]);
>>>>>>> upstream/master
};

export default useCreateReply;
