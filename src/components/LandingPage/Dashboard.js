import React from 'react';
import PropTypes from 'prop-types';
import { Section, Wrapper, P } from 'common/base';
import Columns from 'common/Columns';
import getScale from '../../utils/numberUtils';
import FIcon from './f.svg';
import BarChartIcon from './barChart.svg';
import HandIcon from './hand.svg';
import styles from './Dashboard.module.css';

const Block = ({ Icon, heading, text, smallText }) => (
  <div className={styles.item}>
    <div className={styles.icon}>
      <Icon />
    </div>
    <P size="l">
      <h4 className={styles.heading}>{heading}</h4>
      <div>
        <span className={styles.text}>{text}+</span>
        {smallText}
      </div>
    </P>
  </div>
);
Block.propTypes = {
  Icon: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  smallText: PropTypes.string,
};

const getDatas = ({ timeAndSalaryCount, laborRightsCount }) => [
  {
    Icon: () => <img src={BarChartIcon} alt="BarChartIcon" />,
    heading: '薪資工時資料',
    text: String(getScale(timeAndSalaryCount)),
    smallText: '筆',
  },
  {
    Icon: () => <img src={HandIcon} alt="HandIcon" />,
    heading: '勞動知識',
    text: String(laborRightsCount),
    smallText: '個主題',
  },
  {
    Icon: () => <img src={FIcon} alt="FIcon" />,
    heading: '粉絲專頁',
    text: '一萬',
    smallText: '個讚',
  },
];

const Dashboard = ({ timeAndSalaryCount, laborRightsCount }) => (
  <Section bg="white" className={styles.wrapper}>
    <Wrapper size="l">
      <Columns
        Item={Block}
        items={getDatas({ timeAndSalaryCount, laborRightsCount })}
      />
    </Wrapper>
  </Section>
);

Dashboard.propTypes = {
  timeAndSalaryCount: PropTypes.number,
  laborRightsCount: PropTypes.number,
};

Dashboard.defaultProps = {
  timeAndSalaryCount: 6000,
  laborRightsCount: 13,
};

export default Dashboard;
