import React, { ElementType, ComponentPropsWithRef, ForwardedRef } from 'react';
import cn from 'classnames';
import styles from './Wrapper.module.css';

interface WrapperBaseProps<T extends ElementType> {
  as?: T;
  size?: 's' | 'm' | 'l';
}

type WrapperProps<T extends ElementType> = WrapperBaseProps<T> &
  Omit<ComponentPropsWithRef<T>, keyof WrapperBaseProps<T>>;

const Wrapper = React.forwardRef(
  <T extends ElementType = 'div'>(
    { as, size = 'l', children, className = '', ...props }: WrapperProps<T>,
    ref: ForwardedRef<any>,
  ) => {
    // Default to 'div' if no 'as' prop is provided
    const Tag = as || 'div';

    return (
      <Tag ref={ref} className={cn(styles[size], className)} {...props}>
        {children}
      </Tag>
    );
  },
);

export default Wrapper;
