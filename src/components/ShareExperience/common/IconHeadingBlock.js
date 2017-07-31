import React, { PropTypes } from 'react';
import cn from 'classnames';
import { P } from 'common/base';
import styles from './IconHeadingBlock.module.css';

const IconHeadingBlock = ({ heading, Icon, marginTop, children }) => (
  <section className={cn({ [styles.marginTop]: marginTop })}>
    <div className={styles.header}>
      <P size="l" bold Tag="h2" className={styles.heading}>
        <Icon />{heading}
      </P>
      <P size="s" className={styles.note}><span>*</span> 為必填</P>
    </div>
    <div className={styles.body}>
      {children}
    </div>
  </section>

);

IconHeadingBlock.propTypes = {
  heading: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  marginTop: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default IconHeadingBlock;
