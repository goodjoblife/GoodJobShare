import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router-dom';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';
import Modal from 'common/Modal';

import FacebookFail from './FacebookFail';

import authStatus from '../../../constants/authStatus';

const getFacebookFail = buttonClick => (
  <FacebookFail buttonClick={buttonClick} />
);

class SubmitArea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleAgree = this.handleAgree.bind(this);
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.login = this.login.bind(this);
    this.onFacebookFail = this.onFacebookFail.bind(this);

    this.state = {
      agree: false,
      isOpen: false,
      feedback: null,
      hasClose: false,
      isSubmitting: false,
    };
  }

  onSubmit() {
    if (this.state.isSubmitting === true) {
      return Promise.resolve();
    }
    this.setState({ isSubmitting: true });
    return this.props
      .onSubmit()
      .then(Feedback => {
        this.handleIsOpen(true);
        this.handleHasClose(false);
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
  }

  onFacebookFail() {
    this.handleIsOpen(true);
    this.handleHasClose(true);
    return this.handleFeedback(getFacebookFail(this.login));
  }

  login() {
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
  }

  handleAgree(agree) {
    this.setState(() => ({
      agree,
    }));
  }

  handleFeedback(feedback) {
    this.setState(() => ({
      feedback,
    }));
  }

  handleIsOpen(isOpen) {
    this.setState(() => ({
      isOpen,
    }));
  }

  handleHasClose(hasClose) {
    this.setState(() => ({
      hasClose,
    }));
  }

  render() {
    const { auth } = this.props;

    const { agree, isOpen, feedback, hasClose } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '57px',
        }}
      >
        <label
          style={{
            display: 'flex',
            marginBottom: '28px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          htmlFor="submitArea-checkbox"
        >
          <Checkbox
            margin={'0'}
            value={''}
            label={''}
            checked={agree}
            onChange={e => this.handleAgree(e.target.checked)}
            id="submitArea-checkbox"
          />
          <p
            style={{
              color: '#3B3B3B',
            }}
          >
            我分享的是真實資訊，並且遵守本站
            <Link
              to="/guidelines"
              target="_blank"
              style={{
                color: '#02309E',
              }}
            >
              發文留言規定
            </Link>
            、
            <Link
              to="/user-terms"
              target="_blank"
              style={{
                color: '#02309E',
              }}
            >
              使用者條款
            </Link>
            以及中華民國法律。
          </p>
        </label>
        <div>
          <ButtonSubmit
            text="送出資料"
            onSubmit={this.onSubmit}
            disabled={this.state.isSubmitting || !this.state.agree}
            auth={auth}
            login={this.login}
          />
        </div>
        <Modal
          isOpen={isOpen}
          close={() => this.handleIsOpen(!isOpen)}
          hasClose={hasClose}
        >
          {feedback}
        </Modal>
      </div>
    );
  }
}

SubmitArea.propTypes = {
  onSubmit: PropTypes.func, // () => Promise<({ buttonClickCallback?: () => void }) => Component>
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
  FB: PropTypes.object,
};

export default SubmitArea;
