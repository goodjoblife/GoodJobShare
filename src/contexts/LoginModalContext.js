import { createContext } from 'react';

export default createContext({
  isLoginModalDisplayed: false,
  setLoginModalDisplayed: () => {},
});
