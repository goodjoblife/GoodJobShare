import { useState, useEffect, useRef } from 'react';

/**
 * Utility: return selected attributes of element
 */
const getObservedAttributes = (element, attributesToObserve) => {
  const parameters = {};
  if (element && element.getAttribute) {
    attributesToObserve.forEach(attr => {
      const newAttr = element.getAttribute(attr);
      if (newAttr !== null) {
        parameters[attr] = newAttr;
      }
    });
  }
  return parameters;
};

/**
 * This hook is for using Google Optimize while doing A/B testing.
 *
 * Using MutationObserver to observe attributes change on element
 * with `elementId`, then pass the newest attributes to returned value.
 *
 * Because Google Optimize does not know when react has been loaded, and
 * we need to give attributes to some html element. So, the element with
 * `elementId` is typically the root of react, or at least beyond root
 * component of react.
 *
 * @param {Array} attributesToObserve the array of attributes to observe
 * @param {string} elementId the id of element to observe
 */

export default (attributesToObserve = [], elementId = 'root') => {
  const ref = useRef(null);
  if (typeof document !== 'undefined' && ref.current === null) {
    ref.current = document.getElementById(elementId);
  }

  // get attribute values at this moment
  const getCurrentParameters = () => {
    return getObservedAttributes(ref.current, attributesToObserve);
  };

  const [parameters, setParameters] = useState(getCurrentParameters);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    let observer = null;
    // setup mutation observer
    if (window && 'MutationObserver' in window) {
      observer = new MutationObserver(records => {
        records.forEach(record => {
          if (record.type === 'attributes') {
            const newParameters = getObservedAttributes(
              record.target,
              attributesToObserve,
            );
            setParameters(newParameters);
          }
        });
      });
    }

    // start observing target element
    if (observer && ref.current) {
      // retrieve latest parameters before observing changes
      setParameters(getCurrentParameters());
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

  return parameters;
};
