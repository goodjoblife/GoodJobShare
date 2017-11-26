import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import styles from './App.module.css';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import { PAGE_NAMES } from '../../constants/helmetConstants';
import { HelmetData } from '../../utils/helmetHelper';

const App = ({ children }) => (
  <div className={styles.App}>
    <Header />
    <Helmet {...new HelmetData(PAGE_NAMES.DEFAULT).getData()} />
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
