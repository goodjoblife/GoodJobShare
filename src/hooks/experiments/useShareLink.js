import { useEffect } from 'react';
import { useLocation } from 'react-use';
import { path } from 'ramda';

const ACTIONS = [
  {
    prob: 0.34,
    type: 'SALARY_FORM_ONE_PAGE',
  },
  {
    prob: 0.33,
    type: 'SALARY_FORM_TYPE_FORM',
  },
  {
    prob: 0.33,
    type: 'SALARY_FORM_TYPE_FORM_NO_PROGRESS',
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
  if (action.type === 'INTERVIEW_FORM_ONE_PAGE') {
    return `/share/interview-one-page`;
  } else if (action.type === 'INTERVIEW_FORM_3_STEPS') {
    if (companyName) {
      return `/share/interview?companyName=${companyName}`;
    } else {
      return '/share/interview/step1';
    }
  } else if (action.type === 'INTERVIEW_FORM_TYPE_FORM') {
    if (companyName) {
      return { state: { share: 'interview', companyName } };
    } else {
      return { state: { share: 'interview' } };
    }
  } else if (action.type === 'SALARY_FORM_ONE_PAGE') {
    return '/share/time-and-salary';
  } else if (action.type === 'SALARY_FORM_TYPE_FORM') {
    return { state: { share: 'salary-work-times' } };
  } else if (action.type === 'SALARY_FORM_TYPE_FORM_NO_PROGRESS') {
    return {
      state: {
        share: 'salary-work-times-no-progress-bar',
      },
    };
  } else if (action.type === 'WORK_FORM') {
    return '/share/work-experiences';
  }
};

export const useShareLinkChange = onChange => {
  const location = useLocation();
  const share = path(['state', 'share'])(location.state);

  useEffect(onChange, [share]);
};
