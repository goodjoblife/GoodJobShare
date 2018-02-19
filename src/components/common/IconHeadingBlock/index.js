import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { P } from 'common/base';
import styles from './IconHeadingBlock.module.css';

const IconHeadingBlock = ({ heading, Icon, marginTop, noPadding, requiredText, children }) => (
  <section
    className={cn({
      [styles.marginTop]: marginTop,
    })}
  >
    <div className={styles.header}>
      <P size="l" bold Tag="h2" className={styles.heading}>
        <Icon />{heading}
      </P>
      {requiredText &&
        <P size="s" className={styles.note}><span>*</span> 為必填</P>
      }
    </div>
    <div
      className={cn(styles.body, {
        [styles.noPadding]: noPadding,
      })}
    >
      {children}
    </div>
  </section>

);

IconHeadingBlock.propTypes = {
  heading: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  marginTop: PropTypes.bool,
  noPadding: PropTypes.bool,
  requiredText: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default IconHeadingBlock;
