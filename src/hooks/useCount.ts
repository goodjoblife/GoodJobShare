import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  experienceCountSelector,
  salaryWorkTimeCountSelector,
} from 'selectors/countSelector';
import { queryExperienceCountIfUnfetched } from 'actions/experiences';
import { querySalaryWorkTimeCountIfUnfetched } from 'actions/timeAndSalary';

export const useExperienceCount = (): number => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryExperienceCountIfUnfetched());
  }, [dispatch]);

  return useSelector(experienceCountSelector);
};

export const useSalaryWorkTimeCount = (): number => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(querySalaryWorkTimeCountIfUnfetched());
  }, [dispatch]);

  return useSelector(salaryWorkTimeCountSelector);
};

export const useTotalCount = (): number => {
  const experienceCount = useExperienceCount();
  const timeAndSalaryCount = useSalaryWorkTimeCount();

  return experienceCount + timeAndSalaryCount;
};
