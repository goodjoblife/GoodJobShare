import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { path } from 'ramda';
import {
  generateShareTimeSalaryTypeForm,
  generateShareInterviewTypeForm,
} from 'common/ShareExpSection/shareLinkTo';

const ACTIONS = [
  {
    prob: 0.5,
    generateTo: generateShareTimeSalaryTypeForm,
  },
  {
    prob: 0.5,
    generateTo: generateShareInterviewTypeForm,
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
