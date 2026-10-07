import { useDispatch } from 'react-redux';

import { AppDispatch } from 'reducers';

const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default useAppDispatch;
