import React from 'react';
import Helmet from 'react-helmet';

// import styles from './ExperienceDetail.module.css';

const ExperienceDetail = props => (
  <main className="wrapperL">
    <Helmet
      title="面試‧工作經驗"
    />
    <h1>面試‧工作經驗 (ID: {props.params.id})</h1>
  </main>
);

ExperienceDetail.propTypes = {
  params: React.PropTypes.object.isRequired,
};

export default ExperienceDetail;
