import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Select from 'common/form/Select';
import InputTitle from './InputTitle';

import styles from './EmploymentType.module.css';

import {
  employmentTypeOptions,
} from './optionMap';

const EmploymentType = ({ employmentType, inputTitle, onChange, validator, submitted }) => {
  const isWarning = submitted && !validator(employmentType);
  return (
    <div>
      <InputTitle
        text={inputTitle}
        must
      />
      <div
        className={cn(isWarning ? styles.warning : null)}
        style={{
          position: 'relative',
        }}
      >
        <Select
          options={employmentTypeOptions}
          value={employmentType}
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
                需填寫職務型態
            </p>
            </div>
            : null
        }
      </div>
    </div>
  );
};

EmploymentType.propTypes = {
  employmentType: PropTypes.string,
  inputTitle: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

EmploymentType.defaultProps = {
  validator: () => {},
};

export default EmploymentType;
