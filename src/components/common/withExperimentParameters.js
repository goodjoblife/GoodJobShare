import React, { useState, useEffect } from 'react';

/**
 * This HOC is for using Google Optimize while doing A/B testing.
 *
 * Using MutationObserver to observe attributes change on element
 * with `elementId`, then pass the newest attributes to WrappedComponent.
 *
 * @param {Array} attributeListToObserve the array of attributes to observe
 * @param {string} elementId the id of element to observe
 */

export default (
  attributeListToObserve = [],
  elementId = 'root',
) => WrappedComponent => {
  const WithExperimentParameters = props => {
    let ref = null;
    let observer = null;
    let initialParameters = {};

    // get attribute values at this moment
    if (document) {
      ref = document.getElementById(elementId);
      if (ref) {
        attributeListToObserve.forEach(attr => {
          const newAttr = ref.getAttribute(attr);
          if (newAttr !== null) {
            initialParameters[attr] = newAttr;
          }
        });
      }
    }

    // setup mutation observer
    if (window && 'MutationObserver' in window) {
      observer = new MutationObserver(records => {
        records.forEach(record => {
          if (record.type === 'attributes') {
            const newParameters = {};
            attributeListToObserve.forEach(attr => {
              const newAttr = record.target.getAttribute(attr);
              if (newAttr !== null) {
                newParameters[attr] = newAttr;
              }
            });
            setParameters(newParameters);
          }
        });
      });
    }

    const [parameters, setParameters] = useState(initialParameters);

    useEffect(() => {
      // start observing target element
      if (observer && ref) {
        observer.observe(ref, {
          attributes: true,
        });
      }

      // unsubscribe observation
      return function clear() {
        if (observer) {
          observer.disconnect();
        }
      };
    });

    return <WrappedComponent {...props} experimentParameters={parameters} />;
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithExperimentParameters.displayName = `WithExperimentParameters(${displayName})`;
  return WithExperimentParameters;
};
