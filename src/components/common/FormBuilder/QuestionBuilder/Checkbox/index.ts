import React from 'react';

export { default as Radio } from './Radio';
export { default as RadioElse } from './RadioElse';
export { default as RadioElseRadio } from './RadioElseRadio';
export { default as RadioElseDate } from './RadioElseDate';
export { default as Checkbox } from './Checkbox';
export { default as CheckboxElse } from './CheckboxElse';

export type OptionValue = string | number | null;
export type Option =
  | OptionValue
  | { label: React.ReactNode; value: OptionValue };
