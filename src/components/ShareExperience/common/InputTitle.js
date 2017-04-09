import React, { PropTypes } from 'react';

import variables from 'common/variables.module.css';

const InputTitle = ({ text, must }) => (
  <div>
    <p
      style={{
        display: 'inline-block',
        marginRight: '13px',
      }}
    >
      {text}
    </p>
    {
      must
        ?
          <p
            style={{
              display: 'inline-block',
              color: variables['warning-red'],
            }}
          >
            *
          </p>
        : null
    }
  </div>
);

InputTitle.propTypes = {
  text: PropTypes.string,
  must: PropTypes.bool,
};

export default InputTitle;
