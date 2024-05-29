export const TOGGLE = '@@TOGGLE_EXPANDED_MODAL';
export const OPEN = '@@OPEN_EXPANDED_MODAL';

export const toggleModalOpen = () => {
  return {
    type: TOGGLE,
  };
};

export const openModal = () => {
  return {
    type: OPEN,
  };
};
