import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCommentDots from '@fortawesome/fontawesome-free-solid/faCommentDots';
import Button from './Button';

import styles from './MsgButton.module.css';

const MsgButton = ({ className, onClick }) => (
  <Button btnStyle="blue" className={className} onClick={onClick}>
    <FontAwesomeIcon icon={faCommentDots} className={styles.msgButtonIcon} />
    私訊原作者
  </Button>
);

export default MsgButton;
