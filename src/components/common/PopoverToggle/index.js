import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
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

const PopoverToggle = ({
  className,
  popoverClassName,
  popoverContent,
  children,
}) => {
  const history = useHistory();
  const dropdown = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);

  // close when click outside of dropdown
  const outsideHandler = useCallback(
    e => {
      if (!dropdown.current.contains(e.target)) {
        if (isOpen) {
          close();
        }
      }
    },
    [close, isOpen],
  );
  useEffect(() => {
    document.addEventListener('click', outsideHandler);
    return () => {
      document.removeEventListener('click', outsideHandler);
    };
  }, [outsideHandler]);

  // close when routing change
  useEffect(() => {
    return history.listen(close);
  }, [close, history]);

  return (
    <div
      ref={dropdown}
      className={cn(className, styles.popoverToggle)}
      onClick={() => setIsOpen(isOpen => !isOpen)}
    >
      <Popover className={popoverClassName} active={isOpen}>
        {popoverContent}
      </Popover>
      {children}
    </div>
  );
};

PopoverToggle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  popoverClassName: PropTypes.string,
  popoverContent: PropTypes.node,
};

PopoverToggle.defaultProps = {
  className: '',
  popoverClassName: '',
  popoverContent: '',
};

export default PopoverToggle;
