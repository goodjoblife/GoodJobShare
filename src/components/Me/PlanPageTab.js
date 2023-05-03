import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import styles from './PlanPageTab.module.css';

const PlansPageTab = ({ currentTabId, tabs }) => {
  return (
    <div
      className={styles.container}
      role="tablist"
      aria-label="Plans Page Tablist"
    >
      {tabs.map(tab => {
        const active = tab.id === currentTabId;
        return (
          <Link key={tab.id} to={tab.url}>
            <button
              className={cn({ [styles.active]: active, [styles.tab]: true })}
              id={tab.id}
              role="tab"
              aria-selected={active}
              aria-controls={tab.panelId}
              tabindex="0"
            >
              {tab.title}
            </button>
          </Link>
        );
      })}
    </div>
  );
};

PlansPageTab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      panelId: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
  currentTabId: PropTypes.string,
};

export default PlansPageTab;
