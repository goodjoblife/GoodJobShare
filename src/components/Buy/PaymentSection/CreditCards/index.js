import React from 'react';
import Amex from './amex.svg';
import Jcb from './jcb.svg';
import MasterCard from './mastercard.svg';
import UnionPay from './union_pay.8271208.png';
import Visa from './visa.svg';
import styles from './styles.module.css';

const CreditCard = ({ src }) => (
  <img className={styles.creditCard} src={src} alt="" />
);

const CreditCards = () => (
  <React.Fragment>
    <CreditCard src={Visa} />
    <CreditCard src={MasterCard} />
    <CreditCard src={Jcb} />
    <CreditCard src={Amex} />
    <CreditCard src={UnionPay} />
  </React.Fragment>
);

export default CreditCards;
