import React, { useState, useEffect, useRef } from 'react';

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
    const ref = useRef(null);
    if (document) {
      ref.current = document.getElementById(elementId);
    }

    // get attribute values at this moment
    const getInitialParameters = () => {
      const parameters = {};
      if (ref.current) {
        attributesToObserve.forEach(attr => {
          const newAttr = ref.current.getAttribute(attr);
          if (newAttr !== null) {
            parameters[attr] = newAttr;
          }
        });
      }
      return parameters;
    };

    const [parameters, setParameters] = useState(getInitialParameters);

    useEffect(() => {
      let observer = null;
      // setup mutation observer
      if (window && 'MutationObserver' in window) {
        observer = new MutationObserver(records => {
          records.forEach(record => {
            if (record.type === 'attributes') {
              const newParameters = {};
              attributesToObserve.forEach(attr => {
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

      // start observing target element
      if (observer && ref.current) {
        observer.observe(ref.current, {
          attributes: true,
        });
      }

      // unsubscribe observation
      return function clear() {
        if (observer) {
          observer.disconnect();
        }
      };
    }, []);

    return <WrappedComponent {...props} experimentParameters={parameters} />;
  };

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithExperimentParameters.displayName = `WithExperimentParameters(${displayName})`;
  return WithExperimentParameters;
};
