import { replace } from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import { fields } from 'hooks/tappay/useTappay';
import textStyles from 'common/form/TextInput/TextInput.module.css';

const dropLeadingSymbol = replace(/^#/, '');

const TappayElement = ({ id }) => (
  <div id={dropLeadingSymbol(id)} className={textStyles.input} />
);

TappayElement.propTypes = {
  id: PropTypes.string.isRequired,
};

export const CardNumber = () => <TappayElement id={fields.number.element} />;

export const CardExpirationDate = () => (
  <TappayElement id={fields.expirationDate.element} />
);

export const CardCCV = () => <TappayElement id={fields.ccv.element} />;
