declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '@fortawesome/react-fontawesome' {
  const FontAwesomeIcon: React.ComponentType<{ icon: unknown }>;
  export default FontAwesomeIcon;
}

declare module '@fortawesome/fontawesome-free-solid/*' {
  const icon: unknown;
  export default icon;
}

declare module '@loadable/component' {
  import { ComponentType } from 'react';

  function loadable<T>(
    fn: () => Promise<{ default: ComponentType<T> }>,
  ): ComponentType<T>;
  export default loadable;
}
