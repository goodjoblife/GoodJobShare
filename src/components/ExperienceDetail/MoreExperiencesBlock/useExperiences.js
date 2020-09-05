import { useAsync } from 'react-use';
import R from 'ramda';
import { getCompany } from '../../../apis/company';
import { getJobTitle } from '../../../apis/jobTitle';

const rejectById = id => R.reject(R.propEq('id', id));

const experienceComparator = ({ companyName, jobTitle }) => (a, b) => {
  // 公司與職稱與文章相同
  if (a.company.name === companyName && a.job_title.name === jobTitle)
    return -1;
  if (b.company.name === companyName && b.job_title.name === jobTitle) return 1;
  // 公司與文章相同
  if (a.company.name === companyName) return -1;
  if (b.company.name === companyName) return 1;
  // 職稱與文章相同
  if (a.job_title.name === jobTitle) return -1;
  if (b.job_title.name === jobTitle) return 1;
  // 公司與職稱皆不相同
  return 0;
};

const filterAndReorderExperiencesBy = ({ companyName, jobTitle }) =>
  R.compose(
    R.sortWith([experienceComparator({ companyName, jobTitle })]),
    R.uniqBy(R.prop('id')),
  );

const search = async x => {
  const { companyName, jobTitle } = x;
  const companyPromise = getCompany(companyName);
  const jobTitlePromise = getJobTitle(jobTitle);

  const [fetchedCompany, fetchedJobTitle] = await Promise.all([
    companyPromise,
    jobTitlePromise,
  ]);
  const [
    {
      interview_experiences: companyInterviewExperiences = [],
      work_experiences: companyWorkExperiences = [],
    } = {},
    {
      interview_experiences: jobTitleInterviewExperiences = [],
      work_experiences: jobTitleWorkExperiences = [],
    } = {},
  ] = [fetchedCompany || {}, fetchedJobTitle || {}];

  const experiences = [
    ...companyInterviewExperiences,
    ...companyWorkExperiences,
    ...jobTitleInterviewExperiences,
    ...jobTitleWorkExperiences,
  ];

  const reorderAndFilterExperiences = filterAndReorderExperiencesBy({
    companyName,
    jobTitle,
  });

  return reorderAndFilterExperiences(experiences);
};

const useExperiences = ({ id, companyName, jobTitle }) => {
  const state = useAsync(() =>
    search({ companyName, jobTitle }).then(rejectById(id)),
  );

  if (!state.loading && !state.error) {
    return state.value;
  } else {
    return [];
  }
};

export default useExperiences;
