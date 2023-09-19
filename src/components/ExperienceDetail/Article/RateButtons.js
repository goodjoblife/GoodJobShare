import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Glike from 'common/icons/Glike';
import rateButtonStyles from 'common/button/RateButtonElement.module.css';
import styles from './RateButtons.module.css';
import { overallRatingDialogMap } from '../../ShareExperience/common/optionMap';

const RateButtons = ({ rate }) => (
  <div className={styles.rateButtons}>
    {[1, 2, 3, 4, 5].map(el => (
      <Glike
        key={el}
        className={cn(rateButtonStyles.container, styles.autoCursor, {
          [rateButtonStyles.active]: el <= rate,
        })}
      />
    ))}
    <div className={`${styles.ratingText} pS`}>
      {overallRatingDialogMap[rate]}
    </div>
  </div>
);

RateButtons.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default RateButtons;
