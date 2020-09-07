import { getCompany } from '../../../apis/company';
import { getJobTitle } from '../../../apis/jobTitle';
import { useAsync } from 'react-use';

export default experience => {
  const companyState = useAsync(() => {
    if (experience) return getCompany(experience.company.name);
  }, [experience && experience.company.name]);

  const jobTitleState = useAsync(() => {
    if (experience) return getJobTitle(experience.job_title.name);
  }, [experience && experience.job_title.name]);

  if (
    !companyState.loading &&
    !companyState.error &&
    !jobTitleState.loading &&
    !jobTitleState.error
  ) {
    return [companyState.value, jobTitleState.value];
  } else {
    return [null, null];
  }
};
