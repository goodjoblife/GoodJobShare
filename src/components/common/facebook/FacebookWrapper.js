import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import FacebookContext from 'contexts/FacebookContext';

const FacebookWrapper = ({ children }) => {
  const FB = useContext(FacebookContext);
  const container = useRef(null);

  useEffect(() => {
<<<<<<< HEAD
    if (FB && container) {
=======
    if (FB && container.current) {
>>>>>>> upstream/dev
      FB.XFBML.parse(container.current);
    }
  });

  return <div ref={container}>{children}</div>;
};

FacebookWrapper.propTypes = {
  children: PropTypes.node,
};

export default FacebookWrapper;
