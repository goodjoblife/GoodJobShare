import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createReply } from 'actions/experienceDetail';

const useCreateReply = experienceId => {
  const dispatch = useDispatch();
  return useCallback(comment => dispatch(createReply(experienceId, comment)), [
    dispatch,
    experienceId,
  ]);
};

export default useCreateReply;
