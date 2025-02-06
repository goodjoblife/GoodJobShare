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
  const [isCollapsed, setCollapsed] = useState(false);
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
      rootClassName={className}
      show={!hasEverToggled}
      childrenOnMaskBottom={
        <Button
          className="buttonCircleLoginShare"
          btnStyle="yellow"
          circleSize="lg"
          onClick={toggleCollapsed}
        >
          展開
        </Button>
      }
    >
      <EsgBlock
        className={cn(styles.mobile, { [styles.preview]: !hasEverToggled })}
        contentClassName={cn({
          [styles.collapsed]: isCollapsed,
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
