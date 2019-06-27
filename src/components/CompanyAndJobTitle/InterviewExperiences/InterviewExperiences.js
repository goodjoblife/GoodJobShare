import React from 'react';
import PropTypes from 'prop-types';
import { Section, P } from 'common/base';
import Loader from 'common/Loader';
import styles from './InterviewExperiences.module.css';
import { isUnfetched, isFetching, isError } from '../../../constants/status';
import ExperienceEntry from './ExperienceEntry';

const InterviewExperiences = ({ pageType, status, data }) => {
  if (isUnfetched(status)) {
    return null;
  }
  if (isFetching(status)) {
    return <Loader size="s" />;
  }
  if (isError(status)) {
    return null;
  }
  if (data.length === 0) {
    return (
      <Section Tag="main" paddingBottom>
        <P size="l" bold className={styles.searchNoResult}>
          尚未有「聯發科股份有限公司」的經驗分享
          <br />
          搜尋看看其他？
        </P>
      </Section>
    );
  }
  return data.map(d => (
    <ExperienceEntry key={d._id} pageType={pageType} data={d} />
  ));
};

InterviewExperiences.propTypes = {
  pageType: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  status: PropTypes.string.isRequired,
};

export default InterviewExperiences;
