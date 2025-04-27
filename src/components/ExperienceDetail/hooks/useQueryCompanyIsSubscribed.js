import { useAsyncFn } from 'react-use';
import { useToken } from 'hooks/auth';
import { queryCompanyIsSubscribed } from 'apis/company';

const useQueryCompanyIsSubscribed = companyName => {
  const token = useToken();
  return useAsyncFn(() => queryCompanyIsSubscribed({ companyName, token }), [
    companyName,
    token,
  ]);
};

export default useQueryCompanyIsSubscribed;
