import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import { Wrapper } from 'common/base';
import ShareExpSection from 'common/ShareExpSection';
import i from 'common/icons';
import styles from './Entry.module.css';
import { HELMET_DATA } from '../../constants/helmetData';

const Entry = ({ history }) => (
  <div>
    <Helmet {...HELMET_DATA.SHARE} />
    <Wrapper size="l" className={styles.wrapper}>
      <button onClick={() => history.goBack()} className={styles.closeBtn}><i.X /></button>
    </Wrapper>
    <ShareExpSection />
  </div>
);

Entry.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Entry);
