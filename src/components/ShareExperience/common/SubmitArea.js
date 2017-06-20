import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';
import Modal from 'common/Modal';

import SuccessFeedback from './SuccessFeedback';

class SubmitArea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleAgree = this.handleAgree.bind(this);
    this.handleIsOpen = this.handleIsOpen.bind(this);

    this.state = {
      agree: false,
      isOpen: true,
    };
  }

  handleAgree(agree) {
    this.setState(() => ({
      agree,
    }));
  }

  handleIsOpen(isOpen) {
    this.setState(() => ({
      isOpen,
    }));
  }

  render() {
    const {
      onSubmit,
      submitable,
      auth,
      login,
      FB,
    } = this.props;

    const {
      agree,
      isOpen,
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
            onSubmit={onSubmit}
            disabled={!this.state.agree || !submitable}
            auth={auth}
            login={login}
            FB={FB}
          />
        </div>
        <Modal
          isOpen={isOpen}
          close={() => this.handleIsOpen(!isOpen)}
        >
          <SuccessFeedback />
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
