import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';

// import styles from './ExperienceDetail.module.css';

class ExperienceDetail extends Component {
  componentDidMount() {
    this.props.fetchExperience(this.props.params.id);
  }

  render() {
    const experience = this.props.experienceDetail.get('experience');

    return (
      <main className="wrapperL">
        <Helmet
          title="面試‧工作經驗"
        />
        <h1>面試‧工作經驗 (ID: {experience.get('_id')})</h1>
      </main>
    );
  }
}

ExperienceDetail.propTypes = {
  experienceDetail: ImmutablePropTypes.map.isRequired,
  fetchExperience: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
};

export default ExperienceDetail;
