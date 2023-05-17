import { useSelector } from 'react-redux';

import {
  experienceCountSelector,
  timeAndSalaryCountSelector,
} from 'selectors/countSelector';

export const useExperienceCount = () => useSelector(experienceCountSelector);
export const useTimeAndSalaryCount = () =>
  useSelector(timeAndSalaryCountSelector);

export const useTotalCount = () => {
  const experienceCount = useExperienceCount();
  const timeAndSalaryCount = useTimeAndSalaryCount();

  return experienceCount + timeAndSalaryCount;
};
