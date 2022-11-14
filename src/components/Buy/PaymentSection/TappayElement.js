import R from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import { fields } from 'hooks/tappay/useTappay';

const TappayElement = ({ id }) => (
  <div
    id={R.drop(1, id)}
    style={{ display: 'inline-block', width: '300px', height: '30px' }}
  />
);

TappayElement.propTypes = {
  id: PropTypes.string.isRequired,
};

export const CardNumber = () => <TappayElement id={fields.number.element} />;

export const CardExpirationDate = () => (
  <TappayElement id={fields.expirationDate.element} />
);

export const CardCCV = () => <TappayElement id={fields.ccv.element} />;
