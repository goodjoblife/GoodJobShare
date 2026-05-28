import React from 'react';
import cn from 'classnames';
import Button from 'common/button/Button';
import Checked2 from 'common/icons/Checked2';
import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
  isElse?: boolean;
  onClick?: () => void;
  selected?: boolean;
};

const Option = ({
  children,
  onClick,
  selected,
  isElse,
}: Props): React.ReactElement => {
  return (
    <Button
      className={cn(styles.button, { [styles.link]: isElse })}
      btnStyle={selected ? 'yellow' : 'lightGray'}
      circleSize="lg"
      onClick={onClick}
    >
      {selected && <Checked2 />} {children}
    </Button>
  );
};

export default Option;
