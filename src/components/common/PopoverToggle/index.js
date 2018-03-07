import React from 'react';
import PropTypes from 'prop-types';
import createHistory from 'history/createBrowserHistory';
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

export default class PopoverToggle extends React.Component {
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
    this.close = this.close.bind(this);
    this.outsideHook = this.outsideHook.bind(this);
    this.unlisten = () => {};
  }

  state = {
    isOpen: false,
  }

  componentDidMount() {
    document.addEventListener('click', this.outsideHook);
    this.unlisten = createHistory().listen(this.close);
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
        ref={node => { this.dropdown = node; }}
        className={cn(this.props.className, styles.popoverToggle)}
        onClick={this.toggle}
      >
        <Popover className={this.props.popoverClassName} active={this.state.isOpen}>
          {this.props.popoverContent}
        </Popover>
        {this.props.children}
      </div>
    );
  }
}
