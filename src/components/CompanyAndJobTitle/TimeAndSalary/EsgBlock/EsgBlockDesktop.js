import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EsgBlock from './EsgBlock';
import usePreviewed from './usePreviewed';

const EsgBlockDesktop = ({ className }) => {
  const [hasPreviewed, setPreviewed] = usePreviewed();

  useEffect(() => {
    if (!hasPreviewed) setPreviewed(true);
  }, [hasPreviewed, setPreviewed]);

  return <EsgBlock className={className} hasPreviewed={hasPreviewed} />;
};

EsgBlockDesktop.propTypes = {
  className: PropTypes.string,
};

export default EsgBlockDesktop;
