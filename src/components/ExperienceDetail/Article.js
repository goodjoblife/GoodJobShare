import React from 'react';
import styles from './Article.module.css';
import SectionBlock from './SectionBlock';
import QABlock from './QABlock';

const Article = () => (
  <div className={styles.container}>
    <div className={styles.side}>
      <ul>
        <li>
          <div className="pM">面試地區</div>
          <div className="pMBold">桃園</div>
        </li>
        <li>
          <div className="pS">應徵職稱</div>
          <div className="pMBold">半導體製程工程師</div>
        </li>
        <li>
          <div className="pS">相關職務工作經驗</div>
          <div className="pMBold">5 年</div>
        </li>
        <li>
          <div className="pS">最高學歷</div>
          <div className="pMBold">大學</div>
        </li>
        <li>
          <div className="pS">面試時間</div>
          <div className="pMBold">2017年2月</div>
        </li>
        <li>
          <div className="pS">面試結果</div>
          <div className="pMBold">錄取</div>
        </li>
        <li>
          <div className="pS">待遇</div>
          <div className="pMBold">58,700 / 月</div>
        </li>
        <li>
          <div className="pS">面試整體滿意度</div>
          <div className="pMBold">A</div>
        </li>
        <li>
          <div className="pS">有以下特殊問題</div>
          <div className="pMBold">
            <ul>
              <li>詢問家庭狀況</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div className={styles.main}>
      <h2 className="headingMBold">日月光半導體面試經驗分享</h2>
      <SectionBlock />
      <h3 className="pLBold">面試問答</h3>
      <QABlock />
      <QABlock />
    </div>
  </div>
);

export default Article;
