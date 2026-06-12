import { useParams } from 'react-router-dom';

import { Aspect } from 'constants/companyJobTitle';

export const aspectSelector = (params: Record<string, string>): Aspect => {
  const aspect = params.aspect;
  return (aspect ? decodeURIComponent(aspect) : '') as Aspect;
};

const useAspect = (): Aspect => {
  const params = useParams<Record<string, string>>();
  return aspectSelector(params);
};

export default useAspect;
