import React from 'react';
import { Section, Wrapper, Heading } from 'common/base';
import ButtonRect from 'common/button/ButtonRect';
import styles from './LaborUnionDetail.module.css';

class LaborUnionDetail extends React.Component {
  render() {
    return (
      <Section>
        <Section center>
          <Wrapper className={styles.welcome}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSgEO4b5dyj36gl9Rq1IHDHFfwu2GHMiF6aB6b_U9gQ_zQLujqE&usqp=CAU"
              className={styles.headingIcon}
              alt="勞權圖示"
            />
            <Heading>
              <div className={styles.heading}>台灣電子電機資訊產業公會</div>
              <div className={styles.heading}>守護科技業勞工權益的第一線</div>
            </Heading>
          </Wrapper>
        </Section>
        <div>
          <ButtonRect btnStyle="hoverYellow" className={styles.joinBtn}>
            馬上加入
          </ButtonRect>
        </div>
      </Section>
    );
  }
}

export default LaborUnionDetail;
