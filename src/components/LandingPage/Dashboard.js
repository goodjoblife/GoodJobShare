import React from 'react';
import PropTypes from 'prop-types';
import { Section, Wrapper, P } from 'common/base';
import Columns from 'common/Columns';
import FIcon from './f.svg';
import BarChartIcon from './barChart.svg';
import HandIcon from './hand.svg';
import styles from './Dashboard.module.css';

const Block = ({ Icon, heading, text, smallText }) => (
  <div className={styles.item}>
    <div className={styles.icon}><Icon /></div>
    <P size="l">
      <h4 className={styles.heading}>{heading}</h4>
      <div><span className={styles.text}>{text}+</span>{smallText}</div>
    </P>
  </div>
);
Block.propTypes = {
  Icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  smallText: PropTypes.string,
};

const datas = [
  {
    Icon: BarChartIcon,
    heading: '薪資工時資料',
    text: '5,000',
    smallText: '筆',
  },
  {
    Icon: HandIcon,
    heading: '勞動知識',
    text: '13',
    smallText: '個主題',
  },
  {
    Icon: FIcon,
    heading: '粉絲專頁',
    text: '一萬',
    smallText: '個讚',
  },
];

const Dashboard = () => (
  <Section bg="white" className={styles.wrapper}>
    <Wrapper size="l">
      <Columns
        Item={Block}
        items={datas}
      />
    </Wrapper>
  </Section>
);

export default Dashboard;
