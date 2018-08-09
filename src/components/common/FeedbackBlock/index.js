import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReactGA from 'react-ga';

import { Heading } from 'common/base';
import Button from 'common/button/Button';
import ButtonGroupImage from 'common/button/ButtonGroupImage';
import Checked from 'common/icons/Checked';
import Close from 'common/icons/Close';

import styles from './FeedbackBlock.module.css';

class FeedbackBlock extends React.Component {
  static propTypes = {
    category: PropTypes.string.isRequired,
    question: PropTypes.string,
    placeholders: PropTypes.shape({
      yes: PropTypes.string,
      no: PropTypes.string,
    }),
    className: PropTypes.string,
  };

  static defaultProps = {
    question: '請問您是否覺得以上的資訊實用？ 感到滿意？',
    placeholders: {
      yes: '說說為什麼你覺得很實用？',
      no: '說說為什麼你覺得不實用？ 或是有任何其他的回饋？',
    },
    className: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      polarity: null,
      feedback: '',
      done: false,
    };
  }

  onSubmit = () => {
    ReactGA.event({
      category: this.props.category,
      action: this.state.polarity,
      label: this.state.feedback,
    });
    this.setState({ done: true });
  };

  render() {
    const { polarity, feedback, done } = this.state;
    const { question, placeholders, className } = this.props;
    if (done) {
      return (
        <div className={cn(styles.doneBlock, className)}>
          <Checked className={styles.icon} style={{ marginRight: 20 }} />
          <Heading size="sm" Tag="h4">
            感謝您的回饋！
          </Heading>
        </div>
      );
    }
    return (
      <div className={cn(styles.feedbackBlock, className)}>
        <Heading size="sm" Tag="h4">
          {question}
        </Heading>
        <ButtonGroupImage
          className={styles.btnGroup}
          value={this.state.polarity}
          onChange={v => {
            this.setState({ polarity: v });
          }}
          options={[
            {
              value: 'yes',
              label: '是',
              icon: <Checked className={styles.icon} />,
            },
            {
              value: 'no',
              label: '否',
              icon: <Close className={styles.icon} />,
            },
          ]}
          theme="yellow"
        />
        {polarity === null ? null : (
          <textarea
            className={styles.feedback}
            placeholder={
              polarity === 'yes' ? placeholders.yes : placeholders.no
            }
            onChange={e => {
              e.preventDefault();
              this.setState({ feedback: e.target.value });
            }}
            value={feedback}
          />
        )}
        {polarity === null ? null : (
          <Button
            btnStyle="submit"
            onClick={this.onSubmit}
            className={styles.submitBtn}
          >
            送出
          </Button>
        )}
      </div>
    );
  }
}

export default FeedbackBlock;
