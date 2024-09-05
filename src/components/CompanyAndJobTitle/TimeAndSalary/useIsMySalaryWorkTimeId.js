import { useCallback, useEffect } from 'react';
import { queryMySalaryWorkTimesIdsApi } from 'apis/me';
import { useToken } from 'hooks/auth';
import { useAsyncFn } from 'react-use';

const useIsMySalaryWorkTimeId = () => {
  const token = useToken();

  const [{ value: mySalaryWorkTimeIds }, fetchMySalaryWorkTimeIds] = useAsyncFn(
    () =>
      queryMySalaryWorkTimesIdsApi({
        token,
      }),
    [token],
  );

  useEffect(() => {
    fetchMySalaryWorkTimeIds();
  }, [fetchMySalaryWorkTimeIds]);

  const isMySalaryWorkTimeId = useCallback(
    id => {
      if (!mySalaryWorkTimeIds) return false;
      return mySalaryWorkTimeIds.includes(id);
    },
    [mySalaryWorkTimeIds],
  );

  return isMySalaryWorkTimeId;
};

export default useIsMySalaryWorkTimeId;
