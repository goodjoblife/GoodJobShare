import React, { useState, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { Heading } from 'common/base';

import SearchTextInput from 'common/form/TextInput/SearchTextInput';
import Button from 'common/button/ButtonRect';
import { useShareLink } from 'hooks/experiments';
import styles from './CallToActionBlock.module.css';
import textInputStyle from 'common/form/TextInput/TextInput.module.css';

const CallToActionBlock = ({ history }) => {
  const [companyName, setCompanyName] = useState('');
  const shareLink = useShareLink(companyName);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();
      if (companyName) {
        history.push(shareLink);
      }
    },
    [companyName, history, shareLink],
  );

  return (
    <form className={styles.block} onSubmit={handleSubmit}>
      <Heading size="l" center marginBottom>
        分享你的資訊，一起讓職場更透明
      </Heading>
      <div className={styles.label}>你面試過的公司</div>
      <div className={styles.inputGroup}>
        <div className={styles.input}>
          <SearchTextInput
            className={textInputStyle.input}
            value={companyName}
            onChange={setCompanyName}
            placeholder="輸入公司名稱"
          />
        </div>
        <div className={styles.submit}>
          <Button type="submit">開始分享</Button>
        </div>
      </div>
    </form>
  );
};

export default withRouter(CallToActionBlock);
