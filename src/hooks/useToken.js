import { useSelector } from 'react-redux';
import { tokenSelector } from '../selectors/authSelector';

const useToken = () => useSelector(tokenSelector);

export default useToken;
