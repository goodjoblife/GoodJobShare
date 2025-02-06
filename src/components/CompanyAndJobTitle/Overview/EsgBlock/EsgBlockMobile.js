import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import GradientMask from 'common/GradientMask';
import Caret from 'common/icons/Caret';
import Button from 'common/button/Button';
import { usePageName } from 'pages/Company/usePageName';

import EsgBlock from './EsgBlock';
import styles from './EsgBlock.module.css';

const useEverToggledYearByCopmanyName = () => {
  const key = 'esgEverToggledYearByCopmanyName';

  const getPersistedYearByCompanyName = useCallback(() => {
    try {
      let rawValue = localStorage.getItem(key);
      const yearByCompanyName = JSON.parse(rawValue);
      if (!yearByCompanyName) return [];
      return yearByCompanyName;
    } catch (error) {
      return [];
    }
  }, []);

  const setPersistedYearByCompanyName = useCallback(yearByCompanyName => {
    const rawValue = JSON.stringify(yearByCompanyName);
    localStorage.setItem(key, rawValue);
  }, []);

  const [yearByCompanyName, setYearByCompanyName] = useState(
    getPersistedYearByCompanyName(),
  );
  useEffect(() => {
    setPersistedYearByCompanyName(yearByCompanyName);
  }, [yearByCompanyName, setPersistedYearByCompanyName]);
  return [yearByCompanyName, setYearByCompanyName];
};

const useYear = () => useMemo(() => new Date().getFullYear(), []);

const useEverToggled = companyName => {
  const year = useYear();

  const [
    everToggledYearByCompanyName,
    setEverToggledYearByCompanyName,
  ] = useEverToggledYearByCopmanyName();

  const hasEverToggled = useMemo(
    () => (everToggledYearByCompanyName[companyName] || false) === year,
    [everToggledYearByCompanyName, companyName, year],
  );

  const setEverToggled = useCallback(
    everToggled => {
      const copy = {
        ...everToggledYearByCompanyName,
      };
      if (everToggled) {
        copy[companyName] = year;
      } else {
        delete copy[companyName];
      }
      setEverToggledYearByCompanyName(copy);
    },
    [
      companyName,
      everToggledYearByCompanyName,
      setEverToggledYearByCompanyName,
      year,
    ],
  );

  return [hasEverToggled, setEverToggled];
};

const EsgBlockMobile = ({ className }) => {
  const companyName = usePageName();
  const [hasEverToggled, setEverToggled] = useEverToggled(companyName);
  const [isCollapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(() => {
    if (!hasEverToggled) {
      setEverToggled(true);
      setCollapsed(false);
      return;
    }
    setCollapsed(isCollapsed => !isCollapsed);
  }, [hasEverToggled, setEverToggled]);

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
