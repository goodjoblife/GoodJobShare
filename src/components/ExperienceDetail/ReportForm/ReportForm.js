import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';
import P from 'common/base/P';
import Button from 'common/button/Button';

import ReasonCategory from './ReasonCategory';
import Reason from './Reason';

import authStatus from '../../../constants/authStatus';

import {
  handleToApiParams,
} from './helper';

import { postExperiencesReports } from '../../../apis/reportsExperiencesApi';

import {
  validReasomForm,
  validReason,
  isReasonLimit,
} from './formCheck';

const isLogin = auth =>
  auth.get('status') === authStatus.CONNECTED;

export const reasonCategoryOptions = [
  {
    label: '這是廣告或垃圾訊息',
    value: '這是廣告或垃圾訊息',
  },
  {
    label: '我認為這篇文章涉及人身攻擊、誹謗',
    value: '我認為這篇文章涉及人身攻擊、誹謗',
  },
  {
    label: '我認為這篇文章內容不實',
    value: '我認為這篇文章內容不實',
  },
  {
    label: '其他',
    value: '其他',
  },
];

class ReportForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      reasonCategory: reasonCategoryOptions[0].value,
      reason: '',
      submitted: false,
    };
  }

  onSubmit = () => {
    this.setState({
      submitted: true,
    });
    const valid = validReasomForm(this.state);

    if (valid) {
      return postExperiencesReports(this.props.id, handleToApiParams(this.state))
        .then(this.props.close);
    }

    return null;
  }

  handleReasonCategory = reasonCategory =>
    this.setState({
      reasonCategory,
    })

  handleReason = reason =>
    this.setState({
      reason,
    })

  login = () =>
    this.props.login(this.props.FB)
      .then(this.onSubmit)


  render() {
    const {
      reasonCategory,
      reason,
      submitted,
    } = this.state;

    const {
      close,
      auth,
    } = this.props;

    return (
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '460px',
        }}
      >
        <Heading
          Tag="h2"
          size="l"
          style={{
            marginBottom: '27px',
          }}
        >
          檢舉此篇文章
        </Heading>
        <ReasonCategory
          reasonCategoryOptions={reasonCategoryOptions}
          reasonCategory={reasonCategory}
          handleReasonCategory={this.handleReasonCategory}
        />
        <Reason
          reason={reason}
          onChange={e => this.handleReason(e.target.value)}
          invalid={submitted && !validReason(isReasonLimit(reasonCategory))(reason)}
        />
        <P
          size="s"
          style={{
            textAlign: 'initial',
            marginBottom: '30px',
          }}
        >
          請盡量詳細說明為何這則內容不妥或不實，以供我們評估，您也可以在被檢舉的內容下方留言，
          讓其他使用者知道您的不同意見。
        </P>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '18px',
          }}
        >
          {
            isLogin(auth) ?
              <Button
                circleSize="lg"
                btnStyle="black"
                style={{
                  marginRight: '20px',
                }}
                onClick={this.onSubmit}
              >
                送出
              </Button> :
              <Button
                circleSize="lg"
                btnStyle="black"
                style={{
                  marginRight: '20px',
                }}
                onClick={this.login}
              >
                <pre>{'以 f 認證，並送出檢舉'}</pre>
              </Button>
          }
          <Button
            circleSize="lg"
            btnStyle="black"
            onClick={close}
          >
            取消
          </Button>
        </div>
      </section>
    );
  }
}

ReportForm.propTypes = {
  close: PropTypes.func,
  id: PropTypes.string,
  auth: PropTypes.object,
  login: PropTypes.func,
  FB: PropTypes.object,
};

export default ReportForm;
