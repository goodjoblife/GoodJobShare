import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { path } from 'ramda';
import {
  generateShareTimeSalaryOnePage,
  generateShareTimeSalaryTypeForm,
  generateShareTimeSalaryTypeFormHideProgressBar,
} from 'common/ShareExpSection/shareLinkTo';

const ACTIONS = [
  {
    prob: 0.34,
    type: 'SALARY_FORM_ONE_PAGE',
    generateTo: generateShareTimeSalaryOnePage,
  },
  {
    prob: 0.33,
    type: 'SALARY_FORM_TYPE_FORM',
    generateTo: generateShareTimeSalaryTypeForm,
  },
  {
    prob: 0.33,
    type: 'SALARY_FORM_TYPE_FORM_NO_PROGRESS',
    generateTo: generateShareTimeSalaryTypeFormHideProgressBar,
  },
];

const randomAction = actions => {
  const r = Math.random();
  let accuProb = 0.0;
  for (let action of actions) {
    accuProb += action.prob;
    if (r <= accuProb) {
      return action;
    }
  }
  return actions[0];
};

export default companyName => {
  const action = randomAction(ACTIONS);
  const { generateTo } = action;
  return generateTo();
};

export const useShareLinkChange = onChange => {
  const location = useLocation();
  const share = path(['state', 'share'])(location.state);

  useEffect(onChange, [share]);
};
