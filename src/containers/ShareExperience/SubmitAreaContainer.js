import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { withFB } from 'common/facebook';
import SubmitArea from '../../components/ShareExperience/common/SubmitArea';
import FacebookFail from '../../components/ShareExperience/common/FacebookFail';
import { loginWithFB } from 'actions/auth';
import authStatus from 'constants/authStatus';

const getFacebookFail = buttonClick => (
  <FacebookFail buttonClick={buttonClick} />
);

const withSubmit = Component =>
  class extends React.PureComponent {
    static propTypes = {
      FB: PropTypes.object.isRequired,
      auth: PropTypes.object.isRequired,
      login: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
    };

    state = {
      agree: false,
      isOpen: false,
      feedback: null,
      hasClose: false,
      closableOnClickOutside: true,
      isSubmitting: false,
    };

    onSubmit = () => {
      if (this.state.isSubmitting === true) {
        return Promise.resolve();
      }
      this.setState({ isSubmitting: true });
      return this.props
        .onSubmit()
        .then(Feedback => {
          this.handleIsOpen(true);
          this.handleHasClose(false);
          this.handleclosableOnClickOutside(true);
          return this.handleFeedback(
            Feedback({
              buttonClick: () => this.handleIsOpen(false),
            }),
          );
        })
        .catch(e => console.log(e))
        .then(() => {
          this.setState({ isSubmitting: false });
        });
    };

    onFacebookFail = () => {
      this.handleIsOpen(true);
      this.handleHasClose(true);
      this.handleclosableOnClickOutside(true);
      return this.handleFeedback(getFacebookFail(this.login));
    };

    login = () => {
      return this.props
        .login(this.props.FB)
        .then(status => {
          if (status === authStatus.CONNECTED) {
            return this.onSubmit();
          }
          throw Error('can not login');
        })
        .catch(e => {
          console.log(e);
          this.onFacebookFail();
        });
    };

    handleAgree = agree => {
      this.setState(() => ({
        agree,
      }));
    };

    handleFeedback = feedback => {
      this.setState(() => ({
        feedback,
      }));
    };

    handleIsOpen = isOpen => {
      this.setState(() => ({
        isOpen,
      }));
    };

    handleHasClose = hasClose => {
      this.setState(() => ({
        hasClose,
      }));
    };

    handleclosableOnClickOutside = closableOnClickOutside => {
      this.setState({
        closableOnClickOutside,
      });
    };

    render() {
      const { auth, ...restProps } = this.props;
      const {
        agree,
        isOpen,
        feedback,
        hasClose,
        closableOnClickOutside,
        isSubmitting,
      } = this.state;
      const { handleAgree, handleIsOpen, login, onSubmit } = this;

      return (
        <Component
          {...restProps}
          auth={auth}
          agree={agree}
          handleAgree={handleAgree}
          isOpen={isOpen}
          feedback={feedback}
          hasClose={hasClose}
          closableOnClickOutside={closableOnClickOutside}
          isSubmitting={isSubmitting}
          onSubmit={onSubmit}
          login={login}
          handleIsOpen={handleIsOpen}
        />
      );
    }
  };

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ login: loginWithFB }, dispatch);

const withSubmitContainer = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFB,
  withSubmit,
);

export { withSubmitContainer as withSubmit };

export default withSubmitContainer(SubmitArea);
