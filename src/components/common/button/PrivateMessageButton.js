import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCommentDots from '@fortawesome/fontawesome-free-solid/faCommentDots';
import { usePrivateMessageButtonText } from 'hooks/experiments';
import Button from './Button';

import styles from './PrivateMessageButton.module.css';

const PrivateMessageButton = ({ className, onClick }) => {
  const text = usePrivateMessageButtonText();
  return (
    <Button btnStyle="blue" className={className} onClick={onClick}>
      <FontAwesomeIcon icon={faCommentDots} className={styles.msgButtonIcon} />
      {text}
    </Button>
  );
};

PrivateMessageButton.propTypes = {
  className: Button.propTypes.className,
  onClick: Button.propTypes.onClick,
};

export default PrivateMessageButton;
