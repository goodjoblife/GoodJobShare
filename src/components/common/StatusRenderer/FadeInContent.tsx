import cn from 'classnames';
import React, { PropsWithChildren, useEffect, useState } from 'react';

import styles from './BoxesRenderer.module.css';

const useFadeIn = (): {
  visible: boolean;
  animating: boolean;
  onTransitionEnd: (e: React.TransitionEvent) => void;
} => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame((): void => setVisible(true));
    return (): void => cancelAnimationFrame(id);
  }, []);

  const onTransitionEnd = (e: React.TransitionEvent): void => {
    if (e.propertyName === 'transform') setAnimating(false);
  };

  return { visible, animating, onTransitionEnd };
};

const FadeInContent: React.FC<PropsWithChildren> = ({ children }) => {
  const { visible, animating, onTransitionEnd } = useFadeIn();
  return (
    <div
      className={cn({
        [styles['fade-in']]: animating,
        [styles['fade-in--visible']]: animating && visible,
      })}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};

export default FadeInContent;
