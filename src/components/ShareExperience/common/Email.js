import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextInput from 'common/form/TextInput';
import subscribeValidation from 'common/subscribeValidation';

import InputTitle from './InputTitle';

import styles from './Region.module.css';
import shareStyles from './share.module.css';

import { EMAIL } from '../../../constants/formElements';

const Email = ({ email, inputTitle, onChange, validator, submitted }) => {
  const isWarning = submitted && !validator(email);
  return (
    <div>
      <InputTitle text={inputTitle} />
      <div
        className={cn(
          isWarning ? styles.warning : null,
          shareStyles.single__select__input,
        )}
        style={{
          position: 'relative',
        }}
      >
        <TextInput
          value={email}
          onChange={e => onChange(e.target.value)}
          placeholder="您的電子郵件"
          type="string"
        />
        {isWarning ? (
          <div
            style={{
              position: 'absolute',
              bottom: '0',
              transform: 'translateY(150%)',
            }}
          >
            <p className={`pS ${styles.warning__wording}`}>Email 格式錯誤</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Email.propTypes = {
  email: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  inputTitle: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

Email.defaultProps = {
  validator: () => {},
};

const EmailWithValidation = subscribeValidation(
  Email,
  props => props.validator(props.email),
  EMAIL,
);

export default EmailWithValidation;
