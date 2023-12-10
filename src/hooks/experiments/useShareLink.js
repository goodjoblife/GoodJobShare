import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { path } from 'ramda';

const ACTIONS = [
  {
    prob: 0.34,
    type: 'INTERVIEW_FORM',
  },
  {
    prob: 0.33,
    type: 'SALARY_FORM',
  },
  {
    prob: 0.33,
    type: 'WORK_FORM',
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
  if (action.type === 'INTERVIEW_FORM') {
    if (companyName) {
      return { state: { share: 'interview', companyName } };
    } else {
      return { state: { share: 'interview' } };
    }
  } else if (action.type === 'SALARY_FORM') {
    return '/share/time-and-salary';
  } else if (action.type === 'WORK_FORM') {
    return '/share/work-experiences';
  }
};

export const useShareLinkChange = onChange => {
  const location = useLocation();
  const share = path(['state', 'share'])(location.state);

  useEffect(onChange, [share]);
};
