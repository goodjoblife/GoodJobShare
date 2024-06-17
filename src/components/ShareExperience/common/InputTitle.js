import React from 'react';
import PropTypes from 'prop-types';

import variables from 'common/variables.module.css';

const InputTitle = ({ text, must }) => (
  <div>
    <p
      className="formLabel"
      style={{
        display: 'inline-block',
        marginRight: '13px',
        marginBottom: '7px',
      }}
    >
      {text}
    </p>
    {must ? (
      <p
        style={{
          display: 'inline-block',
          color: variables['warning-red'],
        }}
      >
        *
      </p>
    ) : null}
  </div>
);

InputTitle.propTypes = {
  must: PropTypes.bool,
  text: PropTypes.string,
};

export default InputTitle;
