import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import EsgBlock from './EsgBlock';
import usePreviewed from './usePreviewed';

const EsgBlockDesktop = ({
  className,
  avgSalaryStatistics,
  nonManagerAvgSalaryStatistics,
  nonManagerMedianSalaryStatistics,
  femaleManagerStatistics,
}) => {
  const [hasPreviewed, setPreviewed] = usePreviewed();

  useEffect(() => {
    if (!hasPreviewed) setPreviewed(true);
  }, [hasPreviewed, setPreviewed]);

  return (
    <EsgBlock
      className={className}
      hasPreviewed={hasPreviewed}
      avgSalaryStatistics={avgSalaryStatistics}
      nonManagerAvgSalaryStatistics={nonManagerAvgSalaryStatistics}
      nonManagerMedianSalaryStatistics={nonManagerMedianSalaryStatistics}
      femaleManagerStatistics={femaleManagerStatistics}
    />
  );
};

EsgBlockDesktop.propTypes = {
  avgSalaryStatistics: PropTypes.object.isRequired,
  className: PropTypes.string,
  femaleManagerStatistics: PropTypes.object.isRequired,
  nonManagerAvgSalaryStatistics: PropTypes.object.isRequired,
  nonManagerMedianSalaryStatistics: PropTypes.object.isRequired,
};

export default EsgBlockDesktop;
