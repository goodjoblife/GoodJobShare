import { useCallback } from 'react';

export default ({ id, src, onLoad }) => {
  const loadScript = useCallback(() => {
    if (document.getElementById(id)) return;

    const fjs = document.getElementsByTagName('script')[0];
    const js = document.createElement('script');
    js.id = id;
    js.src = src;
    fjs.parentNode.insertBefore(js, fjs);

    js.onload = onLoad;
  }, [id, onLoad, src]);

  return loadScript;
};
