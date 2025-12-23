import { useParams, Params } from 'react-router-dom';

export const aspectSelector = (
  params: Record<string, string | undefined>,
): string => {
  const aspect = params.aspect;
  return aspect ? decodeURIComponent(aspect) : '';
};

const useAspect = (): string => {
  const params = useParams<Params<string>>();
  return aspectSelector(params);
};

export default useAspect;
