import React, { PropTypes } from 'react';
import cn from 'classnames';
import styles from './Popover.module.css';

const Popover = ({ active, className, children }) =>
  <div
    className={cn(
      styles.popover,
      { [styles.active]: active },
      className,
    )}
    onClick={e => { e.stopPropagation(); }}
  >
    {children}
  </div>;

Popover.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
};

Popover.defaultProps = {
  className: '',
  active: false,
};

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
