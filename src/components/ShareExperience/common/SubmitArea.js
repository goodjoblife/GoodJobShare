import React from 'react';
import PropTypes from 'prop-types';

import ButtonSubmit from 'common/button/ButtonSubmit';
import Checkbox from 'common/form/Checkbox';

class SubmitArea extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleAgree = this.handleAgree.bind(this);

    this.state = {
      agree: false,
    };
  }

  handleAgree(agree) {
    this.setState(() => ({
      agree,
    }));
  }

  render() {
    const {
      onSubmit,
    } = this.props;

    const {
      agree,
    } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '57px',
        }}
      >
        <div
          style={{
            display: 'flex',
            marginBottom: '28px',
            alignItems: 'center',
          }}
        >
          <Checkbox
            margin={'0'}
            value={''}
            label={''}
            checked={agree}
            onChange={e => this.handleAgree(e.target.checked)}
          />
          <p
            style={{
              color: '#3B3B3B',
            }}
          >
            我分享的是真實資訊，並且遵守中華民國法律以及本站使用者條款。
      </p>
        </div>
        <div>
          <ButtonSubmit
            text="送出資料"
            onClick={onSubmit}
            disabled={!this.state.agree}
          />
        </div>
      </div>
    );
  }
}

SubmitArea.propTypes = {
  onSubmit: PropTypes.func,
};

export default SubmitArea;
