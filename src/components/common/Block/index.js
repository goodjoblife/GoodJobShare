import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { P } from 'common/base';
import styles from './Block.module.css';

const Block = ({ heading, requiredText, children, className, style }) => (
  <section className={className} style={style}>
    <div className={cn(styles.body)}>
      <div className={styles.header}>
        {heading && (
          <P size="l" bold Tag="h2" className={styles.heading}>
            {heading}
          </P>
        )}
        {requiredText && (
          <P size="s" className={styles.note}>
            <span>*</span> 為必填
          </P>
        )}
      </div>
      {children}
    </div>
  </section>
);

Block.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  heading: PropTypes.string,
  requiredText: PropTypes.bool,
  style: PropTypes.object,
};

Block.defaultProps = {
  heading: '',
  requiredText: false,
};

export default Block;
