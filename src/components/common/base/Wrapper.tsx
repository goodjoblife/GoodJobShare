import React, { ElementType, ComponentPropsWithRef, ForwardedRef } from 'react';
import cn from 'classnames';
import styles from './Wrapper.module.css';

interface WrapperBaseProps<T extends ElementType> {
  tag?: T;
  size?: 's' | 'm' | 'l';
}

type WrapperProps<T extends ElementType> = WrapperBaseProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof WrapperBaseProps<T>>;

const Wrapper = React.forwardRef(
  <T extends ElementType = 'div'>(
    { tag, size = 'l', children, className = '', ...props }: WrapperProps<T>,
    ref: ForwardedRef<any>,
  ) => {
    // Default to 'div' if no 'tag' prop is provided
    const Tag = tag || 'div';

    return (
      <Tag ref={ref} className={cn(styles[size], className)} {...props}>
        {children}
      </Tag>
    );
  },
);

export default Wrapper;
