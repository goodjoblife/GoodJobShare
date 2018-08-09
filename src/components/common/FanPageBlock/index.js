
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { P } from 'common/base';
import FacebookWrapper from 'common/FacebookWrapper';

import styles from './FanPageBlock.module.css';

class FanPageBlock extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div className={cn(styles.fanPageBlock, this.props.className)}>
        <div>
          <img src="https://image.goodjob.life/follow-us-on-facebook.png" alt="follow" className={styles.img} />
        </div>
        <div className={styles.rightContainer}>
          <P size="l" bold className={styles.text}>馬上追蹤我們的粉專，獲得最新、最實用的職場資訊</P>
          <FacebookWrapper>
            <div
              className="fb-page"
              data-href="https://www.facebook.com/goodjob.life/"
              data-tabs="timeline"
              data-height="70"
              data-small-header="true"
              data-adapt-container-width="true"
              data-hide-cover="true"
              data-show-facepile="false"
            >
              <blockquote
                cite="https://www.facebook.com/goodjob.life/"
                className="fb-xfbml-parse-ignore"
              >
                <a href="https://www.facebook.com/goodjob.life/">職場透明化運動 - GoodJob</a>
              </blockquote>
            </div>
          </FacebookWrapper>
        </div>
      </div>
    );
  }
}

export default FanPageBlock;
