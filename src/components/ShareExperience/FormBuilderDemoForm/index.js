import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faShieldAlt from '@fortawesome/fontawesome-free-solid/faShieldAlt';

import FormBuilder from 'common/FormBuilder';

import styles from './FormBuilderDemoForm.module.css';

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '1em',
};

const ctaHeader = (
  <div className={cn(styles.header, styles.ctaHeader)}>
    <div className={styles.privacyPolicy}>
      <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
      資訊將受永久匿名保護
    </div>
    <div className={styles.title}>請輸入你的一份工作經驗</div>
  </div>
);

const jobTitleHeader = (
  <div className={cn(styles.header, styles.jobTitleHeader)}>
    <div className={styles.privacyPolicy}>
      <FontAwesomeIcon icon={faShieldAlt} className={styles.icon} />
    </div>
    <div className={styles.jobTitle}>
      <div>
        <span className={styles.badge}>工作</span>
      </div>
      <div className={styles.name}>
        欣興電子股份有限公司 軟體工程 軟體工程 軟體工程 軟體工程 軟體工程
        軟體工程 軟體工程 軟體工程
      </div>
    </div>
  </div>
);

const footer = (
  <div className={styles.footer}>
    完成可解鎖全站 2 萬筆資訊{' '}
    <span className={styles.unlockDuration}>48 小時</span>
  </div>
);

const questions = [
  {
    title: '職業名稱',
    type: 'text',
    dataKey: 'title',
    required: true,
    validator: () => true,
  },
  {
    header: jobTitleHeader,
    title: '我與主管合作的狀況',
    type: 'textarea',
    dataKey: 'relationship',
    required: true,
    validator: () => true,
  },
  {
    header: jobTitleHeader,
    title: '工作地區',
    type: 'radio',
    dataKey: 'workingArea',
    required: true,
    validator: () => true,
    options: [
      '台北市',
      '新北市',
      '桃園市',
      '新竹市',
      '苗栗縣',
      '台中市',
      '彰化縣',
      '雲林縣',
      '嘉義市',
      '台南市',
      '高雄市',
      '屏東縣',
      '台東市',
      '花蓮縣',
    ],
  },
  {
    header: jobTitleHeader,
    title: '身份驗證',
    description:
      '若完成身份驗證，之後分享此份工作的任何資訊，獎勵都是 10 倍！可以拍下你此份工作的 名片/工作證/薪資單，或足以證明你在該公司上班的文件！',
    type: 'file',
    dataKey: 'verification',
    validator: () => true,
  },
  {
    header: jobTitleHeader,
    title: '當我需要協助時，主管願意且可以貢獻他的時間協助我',
    type: 'rating',
    dataKey: 'support',
    validator: () => true,
    maxRating: 5,
  },
  {
    header: jobTitleHeader,
    title: 'Question Title',
    description: 'Form Description',
    type: 'customized',
    dataKey: 'salaryWorkTime',
    validator: () => true,
    renderCustomizedQuestion() {
      return (
        <div>
          <select>
            <option>月薪</option>
          </select>
          <label>
            <input type="text" />元
          </label>
        </div>
      );
    },
  },
];

const FormBuilderDemoForm = () => {
  const [isOpen, setOpen] = useState(true);
  const open = useCallback(() => {
    setOpen(true);
  }, []);
  const close = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <div style={containerStyle}>
      <button onClick={open}>Open</button>
      <FormBuilder
        bodyClassName={styles.formBuilder}
        open={isOpen}
        header={ctaHeader}
        footer={footer}
        submitButtonText="Submit"
        questions={questions}
        submitButtonEnabled
        onChange={console.info}
        onSubmit={console.info}
        onClose={close}
      />
    </div>
  );
};

export default FormBuilderDemoForm;
