import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../actions/expandedModal';

const useOpenModal = () => {
  const dispatch = useDispatch();

  const openModalFun = useCallback(() => {
    dispatch(openModal());
  }, [dispatch]);

  return openModalFun;
};

export default useOpenModal;
