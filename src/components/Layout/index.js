import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import styles from './App.module.css';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import helmetData from '../../constants/helmetData';

const App = ({ children }) => (
  <div className={styles.App}>
    <Header />
    <Helmet {...helmetData.DEFAULT} />
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
