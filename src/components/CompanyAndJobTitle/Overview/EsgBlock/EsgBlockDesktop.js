import React, { useEffect } from 'react';
import { useMedia } from 'react-use';
import PropTypes from 'prop-types';
import EsgBlock from './EsgBlock';
import usePreviewed from './usePreviewed';

const EsgBlockDesktop = ({ className }) => {
  const [hasPreviewed, setPreviewed] = usePreviewed();
  const isDesktop = useMedia('(min-width: 850px)');

  useEffect(() => {
    if (isDesktop && !hasPreviewed) setPreviewed(true);
  }, [isDesktop, hasPreviewed, setPreviewed]);

  return <EsgBlock className={className} hasPreviewed={hasPreviewed} />;
};

EsgBlockDesktop.propTypes = {
  className: PropTypes.string,
};

export default EsgBlockDesktop;
