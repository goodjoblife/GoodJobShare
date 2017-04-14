import React from 'react';
import TextInput from 'common/form/TextInput';

import styles from './InterviewInfo.module.css';

import InputTitle from '../common/InputTitle';

import {
  checkWordingLength,
} from '../utils';

class InterviewInfo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleCompany = this.handleCompany.bind(this);

    this.state = {
      companyName: '',
    };
  }

  handleCompany(companyName) {
    this.setState({
      companyName,
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
          <InputTitle
            text="公司/單位 或 統一編號"
            must
          />
          <TextInput
            placeholder="ＯＯ 股份有限公司"
            value={this.state.companyName}
            onChange={e => { this.handleCompany(e.target.value); }}
            isWarning={!checkWordingLength(10)(this.state.companyName)}
            warningWording="請輸入10個字以內"
          />
        </div>
      </div>
    );
  }
}

InterviewInfo.propTypes = {};

export default InterviewInfo;
