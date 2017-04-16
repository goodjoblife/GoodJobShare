import React from 'react';
import TextInput from 'common/form/TextInput';
import Select from 'common/form/Select';

import styles from './InterviewInfo.module.css';

import InputTitle from '../common/InputTitle';

import {
  checkWordingLength,
} from '../utils';

const interviewLocationOptions = [
  {
    label: '台北市',
    value: 1,
  },
  {
    label: '新北市',
    value: 2,
  },
  {
    label: '桃園縣',
    value: 3,
  },
];

class InterviewInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleState = this.handleState.bind(this);

    this.state = {
      companyName: '',
      interviewLocation: null,
    };
  }

  handleState(key) {
    return value =>
      this.setState({
        [key]: value,
      });
  }

  render() {
    return (
      <div
        style={{
          marginTop: '30px',
        }}
      >
        <h1
          style={{
            marginBottom: '13px',
          }}
        >
          面試資訊
        </h1>
        <div className={styles.form}>
          <div
            style={{
              marginBottom: '35px',
            }}
          >
            <InputTitle
              text="公司/單位 或 統一編號"
              must
            />
            <TextInput
              placeholder="ＯＯ 股份有限公司"
              value={this.state.companyName}
              onChange={this.handleState('companyName')}
              isWarning={!checkWordingLength(10)(this.state.companyName)}
              warningWording="請輸入10個字以內"
            />
          </div>
          <div
            style={{
              marginBottom: '41px',
            }}
          >
            <InputTitle
              text="面試地區"
              must
            />
            <Select
              options={interviewLocationOptions}
              value={this.state.interviewLocation}
              onChange={this.handleState('interviewLocation')}
            />
          </div>
        </div>
      </div>
    );
  }
}

InterviewInfo.propTypes = {};

export default InterviewInfo;
