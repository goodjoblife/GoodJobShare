import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import TextAreaInput from 'common/form/TextArea';
import styles from './TextArea.module.css';
import commonStyles from './styles.module.css';

const Textarea = ({
  className,
  page,
  title,
  description,
  dataKey,
  required,
  defaultValue,
  value,
  onChange,
  onConfirm,
  footnote,
  warning,
  setShowsNavigation,
  ...props
}) => (
  <div className={className}>
    <div
      className={cn(styles.container, { [commonStyles.hasWarning]: !!warning })}
    >
      <div
        className={cn(styles.warnableContainer, commonStyles.warnableContainer)}
      >
        <TextAreaInput
          wrapperClassName={styles.wrapper}
          className={cn(styles.textarea)}
          value={value}
          onChange={e => onChange(e.target.value)}
          {...props}
        />
      </div>
      <p
        className={cn(styles.footnote, {
          [commonStyles.warning]: !!warning,
        })}
      >
        {warning ||
          (typeof footnote === 'function' ? footnote(value) : footnote)}
      </p>
    </div>
  </div>
);

Textarea.propTypes = {
  className: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  description: PropTypes.string,
  footnote: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func,
  ]),
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  required: PropTypes.bool,
  setShowsNavigation: PropTypes.func.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  value: PropTypes.string.isRequired,
  warning: PropTypes.string,
};

export default Textarea;
