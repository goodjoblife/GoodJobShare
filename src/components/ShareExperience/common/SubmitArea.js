import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { browserHistory } from 'react-router';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';
import Modal from 'common/Modal';

import SuccessFeedback from './SuccessFeedback';
import FailFeedback from './FailFeedback';

const getSuccessFeedback = id => (
  <SuccessFeedback
    buttonClick={() => (
      browserHistory.push(`/experiences/${id}`)
    )}
  />
);

const getFailFeedback = buttonClick => (
  <FailFeedback
    buttonClick={buttonClick}
  />
);

class SubmitArea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleAgree = this.handleAgree.bind(this);
    this.handleIsOpen = this.handleIsOpen.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      agree: false,
      isOpen: false,
      feedback: null,
    };
  }

  onSubmit() {
    return this.props.onSubmit()
      .then(r => r.experience._id)
      .then(id => {
        this.handleIsOpen(true);
        return this.handleFeedback(getSuccessFeedback(id));
      })
      .catch(() => {
        this.handleIsOpen(true);
        return this.handleFeedback(getFailFeedback(
          () => this.handleIsOpen(false)
        ));
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

  render() {
    const {
      submitable,
      auth,
      login,
      FB,
    } = this.props;

    const {
      agree,
      isOpen,
      feedback,
    } = this.state;

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
            我分享的是真實資訊，並且遵守中華民國法律以及本站使用者條款。
          </p>
        </label>
        <div>
          <ButtonSubmit
            text="送出資料"
            onSubmit={this.onSubmit}
            disabled={!this.state.agree || !submitable}
            auth={auth}
            login={login}
            loginFallback={() => { console.log('登入失敗啦！！！'); }}
            FB={FB}
          />
        </div>
        <Modal
          isOpen={isOpen}
          close={() => this.handleIsOpen(!isOpen)}
        >
          {feedback}
        </Modal>
      </div>
    );
  }
}

SubmitArea.propTypes = {
  onSubmit: PropTypes.func,
  submitable: PropTypes.bool,
  auth: ImmutablePropTypes.map,
  login: PropTypes.func.isRequired,
  FB: PropTypes.object,
};

export default SubmitArea;
