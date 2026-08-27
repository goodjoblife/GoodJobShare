import variables from 'common/variables.module.css';

export const fields = {
  number: {
    element: '#card-number',
    placeholder: '**** **** **** ****',
  },
  expirationDate: {
    element: '#card-expiration-date',
    placeholder: 'MM / YY',
  },
  ccv: {
    element: '#card-ccv',
    placeholder: 'ccv',
  },
};

export const styles = {
  input: {
    color: 'gray',
    // TapPay renders these in iframes, so there is no parent size to inherit
    'font-size': variables.MIN_TOUCH_FONT_SIZE,
  },
  ':focus': {
    color: 'black',
  },
  '.valid': {
    color: 'green',
  },
  '.invalid': {
    color: 'red',
  },
  '@media screen and (max-width: 400px)': {
    input: {
      color: 'orange',
    },
  },
};
