import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import EsgBlock from './EsgBlock';
import usePreviewed from './usePreviewed';

const useIsDesktop = () =>
  useMemo(() => window.matchMedia('(min-width: 850px)').matches, []);

const EsgBlockDesktop = ({ className }) => {
  const [hasPreviewed, setPreviewed] = usePreviewed();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (isDesktop && !hasPreviewed) setPreviewed(true);
  }, [isDesktop, hasPreviewed, setPreviewed]);

  return <EsgBlock className={className} hasPreviewed={hasPreviewed} />;
};

EsgBlockDesktop.propTypes = {
  className: PropTypes.string,
};

export default EsgBlockDesktop;
