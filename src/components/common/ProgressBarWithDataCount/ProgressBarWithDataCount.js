import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from 'common/ProgressBar';
import { goalNum } from '../../../constants/dataProgress';
import { queryExperienceCountIfUnfetched as queryExperienceCount } from '../../../actions/experiences';
import { experienceCountSelector } from '../../../containers/PermissionBlock/selectors';

const ProgressBarWithDataCount = props => {
  const experienceCount = useSelector(experienceCountSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(queryExperienceCount());
  }, [dispatch]);

  return <ProgressBar dataNum={experienceCount} goalNum={goalNum} {...props} />;
};

ProgressBarWithDataCount.feetchData = ({ store: { dispatch } }) => {
  return dispatch(queryExperienceCount());
};

export default ProgressBarWithDataCount;
