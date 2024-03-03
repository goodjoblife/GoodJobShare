import React from 'react';
import { ScoreRange } from './ExpandedModal/ScoreRange';
import TextArea from 'common/form/TextArea';
import styles from './ExpandedModal/NetPromoter.module.css';

export const questionList = [
  {
    id: 1,
    title: '你認為 GoodJob 網站對你找工作有幫助嗎？',
    titleExplanation: null,
    section: <ScoreRange />,
  },
  {
    id: 2,
    title: '你認為 GoodJob 有哪些地方可以做得更好嗎？',
    titleExplanation: '(e.g.新增ＯＯ功能，優化ＸＸ功能)',
    section: <TextArea className={styles.textArea} />,
  },
];
