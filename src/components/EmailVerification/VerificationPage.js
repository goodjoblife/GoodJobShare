import React from 'react';
import PropTypes from 'prop-types';
// import Redirect from 'common/routing/Redirect';

const VerificationPage = ({
  match: {
    params: { verificationCode },
  },
}) => <div>{verificationCode}</div>;

VerificationPage.propTypes = {
  match: PropTypes.shape({
    parmas: PropTypes.shape({
      verificationCode: PropTypes.string,
    }),
  }),
};

export default VerificationPage;
