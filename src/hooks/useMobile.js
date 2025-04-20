import { useMedia } from 'react-use';

const useMobile = () => useMedia('(max-width: 850px)');

export default useMobile;
