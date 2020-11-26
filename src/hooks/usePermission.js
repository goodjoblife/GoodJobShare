import { useEffect, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLogin } from 'hooks/login';
import { fetchMyUnlockedContentsAndPointsIfUnfetched } from '../actions/permission';
import {
  myPointsSelector,
  myUnlockedExperienceRecordsSelector,
  myUnlockedSalaryWorkTimeRecordsSelector,
  hasFetchedSelector,
} from '../selectors/permissionSelector';
import PermissionContext from 'common/permission-context/PermissionContext';

export default () => {
  const dispatch = useDispatch();
  const [isLoggedIn] = useLogin();
  const myPoints = useSelector(myPointsSelector);
  const unlockedExperienceRecords = useSelector(
    myUnlockedExperienceRecordsSelector,
  );
  const unlockedSalaryWorkTimeRecords = useSelector(
    myUnlockedSalaryWorkTimeRecordsSelector,
  );
  const permissionContext = useContext(PermissionContext);
  const firstTimeView = useMemo(() => permissionContext.firstTimeView, [
    permissionContext,
  ]);
  const permissionFetched = useSelector(hasFetchedSelector);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMyUnlockedContentsAndPointsIfUnfetched());
    }
  }, [dispatch, isLoggedIn]);

  return {
    myPoints,
    unlockedSalaryWorkTimeRecords,
    unlockedExperienceRecords,
    firstTimeView,
    permissionFetched,
  };
};
