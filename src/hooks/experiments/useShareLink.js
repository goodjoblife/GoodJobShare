import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { path } from 'ramda';

export default companyName => {
  if (companyName) {
    return { state: { share: 'interview', companyName } };
  } else {
    return { state: { share: 'interview' } };
  }
};

export const useShareLinkChange = onChange => {
  const location = useLocation();
  const share = path(['state', 'share'])(location.state);

  useEffect(onChange, [share]);
};
