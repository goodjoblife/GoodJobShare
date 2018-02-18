import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import ExperienceBlock from '../ExperienceSearch/ExperienceBlock';
import fetchingStatus from '../../constants/status';
import { getExperiencesRecommended } from '../../apis/experiencesApi';

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
    if (nextProps.id !== this.props.id) {
      this.fetchRecommended({ id: nextProps.id });
    }
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
    return (
      <Section paddingTop>
        <Wrapper size="l">
          <Heading size="sl" Tag="h4" marginBottomS>您可能還想看...</Heading>
          { status === fetchingStatus.FETCHING && <Loader size="s" /> }
          {
            status === fetchingStatus.FETCHED &&
              <Columns
                Item={ExperienceBlock}
                items={experiences.map(data => ({ data, size: 's' }))}
                gutter="s"
              />
          }
        </Wrapper>
      </Section>
    );
  }
}

export default RecommendationZone;
