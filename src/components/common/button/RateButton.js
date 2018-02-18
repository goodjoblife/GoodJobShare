import React from 'react';
import PropTypes from 'prop-types';

import RateButtonElement from './RateButtonElement';

class RateButton extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleHover = this.handleHover.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.state = {
      hover: null,
    };
  }

  onMouseEnter(rating) {
    return () => this.handleHover(rating);
  }

  onMouseLeave() {
    return () => this.handleHover(null);
  }

  handleHover(hover) {
    return this.setState({
      hover,
    });
  }

  render() {
    const { max, rating, onChange } = this.props;
    const { hover } = this.state;
    return (
      <div
        style={{
          display: 'flex',
        }}
      >
        {
          Array(max)
            .fill(null)
            .map((_, index) => index + 1)
            .map(ele =>
              <div
                key={ele}
                onMouseEnter={this.onMouseEnter(ele)}
                onMouseLeave={this.onMouseLeave()}
                style={{
                  display: 'inline-block',
                  margin: '0 3px',
                }}
              >
                <RateButtonElement
                  active={rating >= ele}
                  onClick={() => onChange(ele)}
                  hover={hover >= ele}
                />
              </div>
            )
        }
      </div>
    );
  }
}

RateButton.propTypes = {
  max: PropTypes.number,
  rating: PropTypes.number,
  onChange: PropTypes.func,
};

export default RateButton;
