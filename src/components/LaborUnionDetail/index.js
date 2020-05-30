import React from 'react';
import { Section, Wrapper } from 'common/base';
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
          </Wrapper>
        </Section>
      </Section>
    );
  }
}

export default LaborUnionDetail;
