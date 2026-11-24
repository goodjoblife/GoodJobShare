import cn from 'classnames';
import React, { useEffect } from 'react';

import { P } from 'common/base';
import Button from 'common/button/Button';
import editorStyles from 'common/Editor.module.css';
import Modal from 'common/Modal';

import styles from './EsgInfoModal.module.css';

type EsgInfoModalProps = {
  close: () => void;
  title: string;
  children: React.ReactNode;
};

const EsgInfoModal: React.FC<EsgInfoModalProps> = ({
  close,
  title,
  children,
}) => {
  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        close();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [close]);

  return (
    <Modal isOpen hasClose close={close} closableOnClickOutside size="m">
      <P className={styles.title} bold>
        {title}
      </P>
      <div className={cn(editorStyles.editor, styles.description)}>
        {children}
      </div>
      <div className={styles.footer}>
        <Button btnStyle="black" circleSize="md" onClick={close}>
          OK，我瞭解了
        </Button>
      </div>
    </Modal>
  );
};

export default EsgInfoModal;
