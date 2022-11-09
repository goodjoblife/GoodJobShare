import React, { useState } from 'react';
import { Section, Heading, P } from 'common/base';
import Checkbox from 'common/form/Checkbox';
import Button from 'common/button/ButtonRect';

export default () => {
  const [isPrimary, setPrimary] = useState(false);
  return (
    <Section paddingTop>
      <Heading size="sl">填寫信用卡資料</Heading>
      <P bold>卡號</P>
      <P bold>卡片到期日</P>
      <P bold>安全碼</P>
      <P>
        <Checkbox
          label="設為主要付款方式"
          checked={isPrimary}
          value="primary"
          onChange={e => setPrimary(e.target.checked)}
        />
      </P>
      <P size="s">本站使用 TapPay 服務，皆以 2048 bits 進行加密</P>
      <P>
        <Button>付款</Button>
      </P>
    </Section>
  );
};
