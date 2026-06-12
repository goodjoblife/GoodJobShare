declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '@loadable/component' {
  import { ComponentType } from 'react';

  function loadable<T>(
    fn: () => Promise<{ default: ComponentType<T> }>,
  ): ComponentType<T>;
  export default loadable;
}
