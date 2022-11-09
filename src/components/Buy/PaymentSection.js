import R from 'ramda';
import React, { useCallback, useState } from 'react';
import { Section, Heading, P } from 'common/base';
import Checkbox from 'common/form/Checkbox';
import Button from 'common/button/ButtonRect';
import useTappay, { fields } from 'hooks/tappay/useTappay';

const TappayElement = ({ id }) => (
  <div
    id={R.drop(1, id)}
    style={{ display: 'inline-block', width: '300px', height: '30px' }}
  />
);

const CardNumber = () => <TappayElement id={fields.number.element} />;
const CardExpirationDate = () => (
  <TappayElement id={fields.expirationDate.element} />
);
const CardCCV = () => <TappayElement id={fields.ccv.element} />;

const PaymentSection = () => {
  const [isPrimary, setPrimary] = useState(false);
  const submit = useTappay({
    handlePrime: prime => {
      alert('get prime 成功，prime: ' + prime);
      alert('creditCard', { prime });
    },
  });
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      submit();
    },
    [submit],
  );

  return (
    <Section paddingTop>
      <Heading size="sl">填寫信用卡資料</Heading>
      <form onSubmit={onSubmit}>
        <P bold>
          卡號
          <CardNumber />
        </P>
        <P bold>
          卡片到期日
          <CardExpirationDate />
        </P>
        <P bold>
          安全碼
          <CardCCV />
        </P>
      </form>
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

export default PaymentSection;
