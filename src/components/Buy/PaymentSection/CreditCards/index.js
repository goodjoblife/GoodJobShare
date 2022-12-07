import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { keys } from 'ramda';
import Amex from './amex.svg';
import Jcb from './jcb.svg';
import MasterCard from './mastercard.svg';
import UnionPay from './union_pay.8271208.png';
import Visa from './visa.svg';
import styles from './styles.module.css';

const cardTypeSrc = {
  visa: Visa,
  mastercard: MasterCard,
  jcb: Jcb,
  amex: Amex,
  unionpay: UnionPay,
};

const cardTypes = keys(cardTypeSrc);

const isUnknownCardType = cardType => cardTypes.includes(cardType) === false;

const CreditCards = ({ activeCardType }) => (
  <React.Fragment>
    {cardTypes.map(cardType => (
      <img
        key={cardType}
        className={cn(styles.creditCard, {
          [styles.active]:
            activeCardType === cardType || isUnknownCardType(activeCardType),
        })}
        src={cardTypeSrc[cardType]}
        alt=""
      />
    ))}
  </React.Fragment>
);

CreditCards.propTypes = {
  activeCardType: PropTypes.string,
};

export default CreditCards;
