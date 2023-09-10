import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  experienceCountSelector,
  timeAndSalaryCountSelector,
} from 'selectors/countSelector';
import { queryExperienceCountIfUnfetched } from 'actions/experiences';
import { queryTimeAndSalaryCountIfUnfetched } from 'actions/timeAndSalary';

export const useExperienceCount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryExperienceCountIfUnfetched());
  }, [dispatch]);

  return useSelector(experienceCountSelector);
};

export const useTimeAndSalaryCount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryTimeAndSalaryCountIfUnfetched());
  }, [dispatch]);

  return useSelector(timeAndSalaryCountSelector);
};

export const useTotalCount = () => {
  const experienceCount = useExperienceCount();
  const timeAndSalaryCount = useTimeAndSalaryCount();

  return experienceCount + timeAndSalaryCount;
};
