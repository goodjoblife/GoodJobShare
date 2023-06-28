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
  },
  'input.ccv': {
    'font-size': '15px',
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
