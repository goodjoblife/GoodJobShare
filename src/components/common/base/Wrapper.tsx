import React, { ElementType, ComponentPropsWithRef, ForwardedRef } from 'react';
import cn from 'classnames';
import styles from './Wrapper.module.css';

interface WrapperBaseProps<T extends ElementType> {
  Tag?: T;
  size?: 's' | 'm' | 'l';
}

type WrapperProps<T extends ElementType> = WrapperBaseProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof WrapperBaseProps<T>>;

const Wrapper = React.forwardRef(
  <T extends ElementType = 'div'>(
    { Tag, size = 'l', children, className = '', ...props }: WrapperProps<T>,
    ref: ForwardedRef<any>,
  ) => {
    // Default to 'div' if no 'Tag' prop is provided
    const Cls = Tag || 'div';

    return (
      <Cls ref={ref} className={cn(styles[size], className)} {...props}>
        {children}
      </Cls>
    );
  },
);

export default Wrapper;
