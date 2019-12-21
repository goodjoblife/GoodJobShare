export const SET_WINDOW_SIZE = '@@WINDOW_EVENT/SET_WINDOW_SIZE';

const setWindowSize = (width, height) => ({
  type: SET_WINDOW_SIZE,
  width,
  height,
});

export const dispatchWindowSizeChange = ({ width, height }) => dispatch => {
  dispatch(setWindowSize(width, height));
};
