import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import GradientMask from 'common/GradientMask';
import Caret from 'common/icons/Caret';
import Button from 'common/button/Button';

import EsgBlock from './EsgBlock';
import styles from './EsgBlock.module.css';

const EsgBlockMobile = ({ className }) => {
  const [hasEverToggled, setEverToggled] = useState(false);
  const [isCollapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(() => {
    if (!hasEverToggled) {
      setEverToggled(true);
      setCollapsed(false);
      return;
    }
    setCollapsed(isCollapsed => !isCollapsed);
  }, [hasEverToggled]);

  return (
    <GradientMask
      className={className}
      maskClassName={styles.maskFix}
      show={!hasEverToggled}
      childrenOnMaskBottom={
        <Button btnStyle="blackLine" circleSize="lg" onClick={toggleCollapsed}>
          展開
        </Button>
      }
    >
      <EsgBlock
        className={cn(styles.mobile, { [styles.preview]: !hasEverToggled })}
        contentClassName={cn({
          [styles.collapsed]: hasEverToggled && isCollapsed,
        })}
        toggleElement={
          hasEverToggled && (
            <button
              className={cn(styles.toggle, { [styles.collapsed]: isCollapsed })}
              onClick={toggleCollapsed}
            >
              <Caret />
            </button>
          )
        }
      />
    </GradientMask>
  );
};

EsgBlockMobile.propTypes = {
  className: PropTypes.string,
};

export default EsgBlockMobile;
