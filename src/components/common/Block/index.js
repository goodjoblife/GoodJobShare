import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { P } from 'common/base';
import styles from './Block.module.css';

const Block = ({ heading, requiredText, children }) => (
  <section>
    <div className={cn(styles.body)}>
      <div className={styles.header}>
        <P size="l" bold Tag="h2" className={styles.heading}>
          {heading}
        </P>
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
  heading: PropTypes.string.isRequired,
  requiredText: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Block.defaultProps = {
  requiredText: false,
};

export default Block;
