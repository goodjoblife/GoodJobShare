import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import GradientMask from 'common/GradientMask';
import Button from 'common/button/Button';

import EsgBlock from './EsgBlock';
import styles from './EsgBlock.module.css';
import usePreviewed from './usePreviewed';

const EsgBlockMobile = ({ className, ...props }) => {
  const [hasPreviewed, setPreviewed] = usePreviewed();
  const markPreviewed = useCallback(() => setPreviewed(true), [setPreviewed]);

  return (
    <GradientMask
      rootClassName={className}
      maskClassName={styles.maskFix}
      show={!hasPreviewed}
      childrenOnMaskBottom={
        <Button btnStyle="blackLine" circleSize="lg" onClick={markPreviewed}>
          展開
        </Button>
      }
    >
      <EsgBlock
        className={cn(styles.mobile, { [styles.preview]: !hasPreviewed })}
        showsToggle={hasPreviewed}
        hasPreviewed={hasPreviewed}
        {...props}
      />
    </GradientMask>
  );
};

EsgBlockMobile.propTypes = {
  className: PropTypes.string,
};

export default EsgBlockMobile;
