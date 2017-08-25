import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Heading from 'common/base/Heading';

import ReasonCategory from './ReasonCategory';

const reasonCategoryOptions = [
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
    };
  }

  handleReasonCategory = reasonCategory =>
    this.setState({
      reasonCategory,
    })

  render() {
    const {
      reasonCategory,
    } = this.state;
    return (
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: '460px',
        }}
      >
        <Heading
          Tag="h2"
          size="m"
          style={{
            marginBottom: '27px',
          }}
        >
          檢舉此文章
        </Heading>
        <ReasonCategory
          reasonCategoryOptions={reasonCategoryOptions}
          reasonCategory={reasonCategory}
          handleReasonCategory={this.handleReasonCategory}
        />
      </section>
    );
  }
}

ReportForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default ReportForm;
