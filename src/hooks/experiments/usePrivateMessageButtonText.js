import { useEffect, useMemo } from 'react';
import useExperimentParameters from 'hooks/useExperimentParameters';
import { activateOptimize } from 'utils/gtm';

export default () => {
  useEffect(() => {
    activateOptimize('testPrivateMessageButtonText');
  }, []);

  const experimentParameters = useExperimentParameters([
    'privateMessageButtonText',
  ]);

  const text = useMemo(() => {
    if (experimentParameters.privateMessageButtonText) {
      return experimentParameters.privateMessageButtonText;
    } else {
      return '私訊原作者';
    }
  }, [experimentParameters.privateMessageButtonText]);

  return text;
};
