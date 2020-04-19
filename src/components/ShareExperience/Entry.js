import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Wrapper } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import i from 'common/icons';
import styles from './Entry.module.css';
import StaticHelmet from 'common/StaticHelmet';
import InterviewExperienceTypeForm from './InterviewForm/TypeForm';

const Entry = ({ history }) => {
  const [openModalType, setOpenModalType] = useState(null);
  return (
    <div>
      <StaticHelmet.Share />
      <Wrapper size="l" className={styles.wrapper}>
        <button onClick={() => history.goBack()} className={styles.closeBtn}>
          <i.X />
        </button>
      </Wrapper>
      <ShareExpSection
        onSelectInterviewExperience={() =>
          setOpenModalType('InterviewExperience')
        }
      />
      <InterviewExperienceTypeForm
        open={openModalType === 'InterviewExperience'}
        onClose={() => setOpenModalType(null)}
      />
    </div>
  );
};

Entry.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Entry);
