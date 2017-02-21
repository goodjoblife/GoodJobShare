import React, { PropTypes } from 'react';

import styles from './App.module.css';
import Header from './Header';
import Footer from './Footer';


const App = ({ children }) => (
  <div className={styles.App}>
    <Header />
    {children}
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;
