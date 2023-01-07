import { path } from 'ramda';

export const redirectUrlSelector = path(['paymentPersist', 'redirectUrl']);
export const paymentRecordSelector = path(['payment', 'paymentRecord']);
