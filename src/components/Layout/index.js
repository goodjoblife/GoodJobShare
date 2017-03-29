import React, { PropTypes } from 'react';

import styles from './App.module.css';
import Header from './Header';
import Footer from './Footer';


const App = ({ children }) => (
  <div className={styles.App}>
    <Header />
    <div className={styles.content}>
      {children}
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;
