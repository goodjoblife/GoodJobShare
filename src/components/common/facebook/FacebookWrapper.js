import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef } from 'react';

import FacebookContext from 'contexts/FacebookContext';

const FacebookWrapper = ({ children }) => {
  const { FB, loadFacebook } = useContext(FacebookContext);
  const container = useRef(null);

  useEffect(() => {
    const node = container.current;
    if (!node) return undefined;

    if (!window.IntersectionObserver) {
      loadFacebook({ trigger: 'facebook-widget' });
      return undefined;
    }

    const observer = new window.IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;

        loadFacebook({ trigger: 'facebook-widget' });
        observer.disconnect();
      },
      { rootMargin: '200px' },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [loadFacebook]);

  useEffect(() => {
    if (FB && container.current) {
      FB.XFBML.parse(container.current);
    }
  }, [FB]);

  return <div ref={container}>{children}</div>;
};

FacebookWrapper.propTypes = {
  children: PropTypes.node,
};

export default FacebookWrapper;
