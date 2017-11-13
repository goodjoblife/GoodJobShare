import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

import styles from './App.module.css';
import Header from '../../containers/Layout/Header';
import Footer from './Footer';
import { HELMET_DATA } from '../../constants/helmetData';

import { fetchExperiences } from '../../actions/experienceSearch';

class App extends React.Component {
  static fetchData({ store: { dispatch } }) {
    return Promise.all([
      dispatch(fetchExperiences(0, 1, 'popularity', 'created_at', '')),
    ]);
  }

  componentDidMount() {
    this.props.fetchExperiences(0, 1, 'popularity', 'created_at', '');
  }

  render() {
    const { children, location, experienceCount } = this.props;
    return (
      <div className={styles.App}>
        <Header location={location} experienceCount={experienceCount} />
        <Helmet {...HELMET_DATA.DEFAULT} />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object,
  experienceCount: PropTypes.number,
  fetchExperiences: PropTypes.func.isRequired,
};


export default App;
