import React from 'react';
import useExperimentParameters from 'hooks/useExperimentParameters';

/**
 * This HOC is for using Google Optimize while doing A/B testing.
 *
 * Using MutationObserver to observe attributes change on element
 * with `elementId`, then pass the newest attributes to WrappedComponent.
 *
 * Because Google Optimize does not know when react has been loaded, and
 * we need to give attributes to some html element. So, the element with
 * `elementId` is typically the root of react, or at least beyond root
 * component of react.
 *
 * @param {Array} attributesToObserve the array of attributes to observe
 * @param {string} elementId the id of element to observe
 */

export default (
  attributesToObserve = [],
  elementId = 'root',
) => WrappedComponent => {
  const WithExperimentParameters = props => {
    const parameters = useExperimentParameters(attributesToObserve, elementId);
    return <WrappedComponent {...props} experimentParameters={parameters} />;
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithExperimentParameters.displayName = `WithExperimentParameters(${displayName})`;
  return WithExperimentParameters;
};
