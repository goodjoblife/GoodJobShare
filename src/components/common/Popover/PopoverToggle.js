import React, { PropTypes } from 'react';
import cn from 'classnames';
import Popover from '.';
import styles from './Popover.module.css';

export default class extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    popoverClassName: PropTypes.string,
    children: PropTypes.node.isRequired,
    popoverContent: PropTypes.node,
  }

  static defaultProps = {
    className: '',
    popoverClassName: '',
    popoverContent: '',
  }

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  state = {
    isOpen: false,
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div className={cn(this.props.className, styles.toggle)} onClick={this.toggle}>
        <Popover className={this.props.popoverClassName} active={this.state.isOpen}>
          {this.props.popoverContent}
        </Popover>
        {this.props.children}
      </div>
    );
  }
}
