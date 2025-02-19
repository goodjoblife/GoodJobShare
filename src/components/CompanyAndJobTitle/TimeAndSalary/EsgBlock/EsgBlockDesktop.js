import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EsgBlock from './EsgBlock';
import usePreviewed from './usePreviewed';

const EsgBlockDesktop = ({ className, ...props }) => {
  const [hasPreviewed, setPreviewed] = usePreviewed();

  useEffect(() => {
    if (!hasPreviewed) setPreviewed(true);
  }, [hasPreviewed, setPreviewed]);

  return (
    <EsgBlock className={className} hasPreviewed={hasPreviewed} {...props} />
  );
};

EsgBlockDesktop.propTypes = {
  className: PropTypes.string,
};

export default EsgBlockDesktop;
