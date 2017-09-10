import React, { Component, PropTypes } from 'react';

// import Button from 'common/button/Button';
// import Checkbox from 'common/form/Checkbox';
import Loader from 'common/Loader';
import RecommendationBlock from './RecommendationBlock';
import fetchingStatus from '../../constants/status';
import { getExperiencesRecommended } from '../../apis/experiencesApi';

import styles from './RecommendationZone.module.css';

class RecommendationZone extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  state = {
    status: fetchingStatus.UNFETCHED,
    experiences: [],
  }

  componentDidMount() {
    this.fetchRecommended({ id: this.props.id });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.status === fetchingStatus.FETCHED) return;
    if (nextProps.id === this.props.id) return;

    this.fetchRecommended({ id: this.nextProps.id });
  }

  fetchRecommended({ id }) {
    this.setState({
      status: fetchingStatus.FETCHING,
      experiences: [],
    });

    getExperiencesRecommended(id)
      .then(result => {
        this.setState({
          status: fetchingStatus.FETCHED,
          experiences: result.experiences,
        });
      })
      .catch(() => {
        this.setState({
          status: fetchingStatus.ERROR,
          experiences: [],
        });
      });
  }

  render() {
    const { status, experiences } = this.state;
    console.log(experiences);
    return (
      <div className={styles.container}>
        <div className="subheadingL">您可能還想看...</div>
        <br />
        <div className={styles.recommendationZone}>
          { status === fetchingStatus.FETCHING && <Loader /> }
          {
            status === fetchingStatus.FETCHED &&
            experiences
              .map(experience => <RecommendationBlock key={experience._id} experience={experience} />)
          }
        </div>
      </div>
    );
  }
}

export default RecommendationZone;
