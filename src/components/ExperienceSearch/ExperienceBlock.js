import React from 'react';

import Block from '../common/Block';

import styles from './ExperienceBlock.module.css';

class ExperienceBlock extends React.Component {
  // static propTypes = {
  //   children: PropTypes.node,
  // }

  render() {
    return (
      <Block>
        <div className={styles.container}>
          <div className={`pS ${styles.createdDate}`}>
            {'面試　•　2016 年 12 月'}
          </div>
          <div className={`headingM ${styles.heading}`}>
            日月光半導體面試經驗分享
          </div>
          <div className={`pSBold ${styles.label}`}>
            <div>日月光半導體製造股份有限公司</div>
            <div>專案工程師</div>
            <div>台北市</div>
            <div>34700/月</div>
          </div>
          <div className={`pM ${styles.content}`}>
            這個是面試內容，這個是面試內容，這個是面試內容，這個是面試內容，這個是面試內容。
          </div>
          <div>like & commnet</div>
        </div>
      </Block>
    );
  }
}

export default ExperienceBlock;
