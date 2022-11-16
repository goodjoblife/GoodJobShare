import { useEffect } from 'react';

export default ({ id, src, onLoad }) => {
  useEffect(() => {
    const fjs = document.getElementsByTagName('script')[0];
    if (document.getElementById(id)) return;
    const js = document.createElement('script');
    js.id = id;
    js.src = src;
    fjs.parentNode.insertBefore(js, fjs);

    js.onload = onLoad;
  }, [id, onLoad, src]);
};
