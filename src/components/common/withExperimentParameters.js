import React from 'react';

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
  class WithExperimentParameters extends React.Component {
    constructor(props) {
      super(props);
      // get node reference
      this.nodeRef = null;
      if (document) {
        this.nodeRef = document.getElementById(elementId);
      }

      // setup mutation observer
      this.observer = null;
      if (window && 'MutationObserver' in window) {
        this.observer = new MutationObserver(records => {
          records.forEach(record => {
            if (record.type === 'attributes') {
              const newParameters = {};
              attributesToObserve.forEach(attr => {
                const newAttr = record.target.getAttribute(attr);
                if (newAttr !== null) {
                  newParameters[attr] = newAttr;
                }
              });
              this.setState({ parameters: newParameters });
            }
          });
        });
      }

      // intialize state
      this.state = {
        parameters: this.getInitialParameters(),
      };

      // start observing target element
      if (this.observer && this.nodeRef) {
        this.observer.observe(this.nodeRef, {
          attributes: true,
        });
      }
    }

    // get attribute values at this moment
    getInitialParameters = () => {
      const parameters = {};
      if (this.nodeRef) {
        attributesToObserve.forEach(attr => {
          const newAttr = this.nodeRef.getAttribute(attr);
          if (newAttr !== null) {
            parameters[attr] = newAttr;
          }
        });
      }
      return parameters;
    };

    componentWillUnmount() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          experimentParameters={this.state.parameters}
        />
      );
    }
  }

  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithExperimentParameters.displayName = `WithExperimentParameters(${displayName})`;
  return WithExperimentParameters;
};
