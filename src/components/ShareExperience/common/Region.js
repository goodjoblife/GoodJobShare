import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import styles from './Region.module.css';
import shareStyles from './share.module.css';

import {
  regionOptions,
} from './optionMap';

const Region = ({ region, inputTitle, onChange, validator, submitted }) => {
  const isWarning = submitted && !validator(region);
  return (
    <div>
      <InputTitle
        text={inputTitle}
        must
      />
      <div
        className={cn(isWarning ? styles.warning : null, shareStyles.single__select__input)}
        style={{
          position: 'relative',
        }}
      >
        <Select
          options={regionOptions}
          value={region}
          onChange={
            e => onChange(e.target.value)
          }
        />
        {
          isWarning ?
            <div
              style={{
                position: 'absolute',
                bottom: '0',
                transform: 'translateY(150%)',
              }}
            >
              <p
                className={`pS ${styles.warning__wording}`}
              >
                需填寫面試地區
              </p>
            </div>
            : null
        }
      </div>
    </div>
  );
};

Region.propTypes = {
  region: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  inputTitle: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

Region.defaultProps = {
  validator: () => {},
};

export default Region;
