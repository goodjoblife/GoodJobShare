import React from 'react';
import PropTypes from 'prop-types';
import styles from './EsgBlock.module.css';
import Card from 'common/Card';
import Caret from 'common/icons/Caret';

const EsgItemBlock = ({ title }) => (
  <Card className={styles.item}>
    <div>2023 年</div>
    <div>{title}</div>
    <div>
      <span>97.3</span>萬 / 年
    </div>
    <div>
      與同業相比<span>-6.6%</span>
    </div>
  </Card>
);

EsgItemBlock.propTypes = {
  title: PropTypes.string.isRequired,
};

const EsgBlock = () => (
  <Card>
    <div>
      企業ESG公開薪資揭露 <Caret className={styles.caret} />
    </div>
    <div className={styles.items}>
      <EsgItemBlock title="員工薪資平均數" />
      <EsgItemBlock title="非主管全時員工薪資平均數" />
      <EsgItemBlock title="非主管全時員工薪資中位數" />
      <EsgItemBlock title="管理職女性主管佔比" />
    </div>
  </Card>
);

export default EsgBlock;
