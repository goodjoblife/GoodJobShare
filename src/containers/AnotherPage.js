import React from 'react';

import { Section } from 'common/base';
import Button from 'common/button/Button';
import Modal from 'common/Modal';
import FacebookFail from '../components/ShareExperience/common/FacebookFail';
import FailFeedback from '../components/ShareExperience/common/FailFeedback';
import SuccessFeedback from '../components/ShareExperience/common/SuccessFeedback';

const AnotherPage = () => (
  <div style={{ padding: 10 }}>
    <Button circleSize="md" btnStyle="black" onClick={() => { console.log('test'); }}>
      立即註冊
    </Button>
    <br /><br />
    <Button circleSize="lg" btnStyle="gray">看更多</Button>
    <br /><br />
    <Button circleSize="lg" btnStyle="hoverYellow">分享面試經驗</Button>
    <br /><br />
    <Button btnStyle="submit">送出資料</Button>
    <br /><br />
    <Button btnStyle="back">返回列表</Button>
    <br /><br />

    <div className="headingL">熱門分享 (headingL)</div>
    <div className="headingL">熱門分享 (headingL)</div>

    <div className="headingM">日月光半導體面試經驗分享 (headingM)</div>
    <div className="headingM">日月光半導體面試經驗分享 (headingM)</div>

    <div className="subheadingL">日月光半導體面試經驗分享 (subheadingL)</div>
    <div className="subheadingL">日月光半導體面試經驗分享 (subheadingL)</div>

    <div className="subheadingM">在日月光待了6年 (subheadingM)</div>
    <div className="subheadingM">在日月光待了6年 (subheadingM)</div>

    <div className="pL">留下工時或薪資 (pL)</div>
    <div className="pL">留下工時或薪資 (pL)</div>

    <div className="pM">第一間面試我的公司 (pM)</div>
    <div className="pM">第一間面試我的公司 (pM)</div>

    <div className="pS">第一間面試我的公司 (pS)</div>
    <div className="pS">第一間面試我的公司 (pS)</div>

    <div className="pLBold">留下工時或薪資 (pLBold)</div>
    <div className="pLBold">留下工時或薪資 (pLBold)</div>

    <div className="pMBold">第一間面試我的公司 (pMBold)</div>
    <div className="pMBold">第一間面試我的公司 (pMBold)</div>

    <div className="pSBold">第一間面試我的公司 (pSBold)</div>
    <div className="pSBold">第一間面試我的公司 (pSBold)</div>

    <div className="formLabel">公司/單位 或 統一編號 (formLabel)</div>
    <div className="formLabel">公司/單位 或 統一編號 (formLabel)</div>
    <Section padding>
      <Modal
        hasClose
      >
        <FacebookFail />
      </Modal>
    </Section>
    <Section padding>
      <Modal
        hasClose
      >
        <FailFeedback />
      </Modal>
    </Section>
    <Section padding>
      <Modal
        hasClose
      >
        <SuccessFeedback />
      </Modal>
    </Section>
  </div>
);


export default AnotherPage;
