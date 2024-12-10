import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { path } from 'ramda';
import {
  generateShareTimeSalaryTypeForm,
  generateShareInterviewTypeForm,
  generateShareWork,
} from 'common/ShareExpSection/shareLinkTo';

const ACTIONS = [
  {
    prob: 0.45,
    generateTo: generateShareTimeSalaryTypeForm,
  },
  {
    prob: 0.1,
    generateTo: generateShareInterviewTypeForm,
  },
  {
    prob: 0.45,
    generateTo: generateShareWork,
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
