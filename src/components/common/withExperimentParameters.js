import React, { Component } from 'react';

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
  class WithExperimentParameters extends Component {
    constructor(props) {
      super(props);
      this.state = {
        parameters: {},
      };

      if (window && 'MutationObserver' in window) {
        // initialize mutation observer
        this.observer = new MutationObserver(records => {
          records.forEach(record => {
            if (record.type === 'attributes') {
              const newParameters = {};
              attributeListToObserve.forEach(attr => {
                const newAttr = record.target.getAttribute(attr);
                if (newAttr !== null) {
                  newParameters[attr] = newAttr;
                }
              });
              this.setState({
                parameters: newParameters,
              });
            }
          });
        });
      }

      if (document) {
        this.ref = document.getElementById(elementId);

        // get attribute values at this moment
        if (this.ref) {
          const newParameters = {};
          attributeListToObserve.forEach(attr => {
            const newAttr = this.ref.getAttribute(attr);
            if (newAttr !== null) {
              newParameters[attr] = newAttr;
            }
          });
          this.state = {
            parameters: newParameters,
          };
        }
      }
    }
    componentDidMount() {
      // start observing target element
      if (this.observer && this.ref) {
        this.observer.observe(this.ref, {
          attributes: true,
        });
      }
    }

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
