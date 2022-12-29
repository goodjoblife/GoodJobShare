import { path } from 'ramda';

export const redirectUrlSelector = path(['payment', 'redirectUrl']);
export const paymentRecordSelector = path(['payment', 'paymentRecord']);
