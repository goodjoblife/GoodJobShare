import { isFetched } from 'utils/fetchBox';
import { RootState } from 'reducers';
import { ExperienceCountBox } from 'reducers/experiences';
import { SalaryWorkTimeCountBox } from 'reducers/salaryWorkTime';

export const experienceCountBoxSelector = (
  state: RootState,
): ExperienceCountBox => {
  return state.experiences.countBox;
};

export const experienceCountSelector = (state: RootState): number => {
  const countBox = experienceCountBoxSelector(state);
  if (isFetched(countBox)) {
    return countBox.data;
  }
  return 0;
};

export const salaryWorkTimeCountBoxSelector = (
  state: RootState,
): SalaryWorkTimeCountBox => {
  return state.salaryWorkTime.countBox;
};

export const salaryWorkTimeCountSelector = (state: RootState): number => {
  const countBox = salaryWorkTimeCountBoxSelector(state);
  if (isFetched(countBox)) {
    return countBox.data;
  }
  return 0;
};
