import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import cn from 'classnames';
import styles from './Popover.module.css';

const Popover = ({ active, className, children }) => (
  <div
    className={cn(styles.popover, { [styles.active]: active }, className)}
    onClick={e => {
      e.stopPropagation();
    }}
  >
    {children}
  </div>
);

Popover.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Popover.defaultProps = {
  className: '',
  active: false,
};

class PopoverToggle extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    history: PropTypes.object.isRequired,
    popoverClassName: PropTypes.string,
    popoverContent: PropTypes.node,
  };

  static defaultProps = {
    className: '',
    popoverClassName: '',
    popoverContent: '',
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.outsideHook = this.outsideHook.bind(this);
    this.unlisten = () => {};
  }

  state = {
    isOpen: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.outsideHook);
    this.unlisten = this.props.history.listen(this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.outsideHook);
    this.unlisten();
  }

  outsideHook(e) {
    if (!this.dropdown.contains(e.target)) {
      if (this.state.isOpen) this.toggle();
    }
  }

  close() {
    this.setState({ isOpen: false });
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <div
        ref={node => {
          this.dropdown = node;
        }}
        className={cn(this.props.className, styles.popoverToggle)}
        onClick={this.toggle}
      >
        <Popover
          className={this.props.popoverClassName}
          active={this.state.isOpen}
        >
          {this.props.popoverContent}
        </Popover>
        {this.props.children}
      </div>
    );
  }
}

export default withRouter(PopoverToggle);
