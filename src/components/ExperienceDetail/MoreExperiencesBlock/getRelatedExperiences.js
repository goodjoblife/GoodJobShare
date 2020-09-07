import R from 'ramda';

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

const getRelatedExperiences = ({ experience, company, jobTitle }) => {
  const [
    {
      interview_experiences: companyInterviewExperiences = [],
      work_experiences: companyWorkExperiences = [],
    } = {},
    {
      interview_experiences: jobTitleInterviewExperiences = [],
      work_experiences: jobTitleWorkExperiences = [],
    } = {},
  ] = [company || {}, jobTitle || {}];

  const experiences = [
    ...companyInterviewExperiences,
    ...companyWorkExperiences,
    ...jobTitleInterviewExperiences,
    ...jobTitleWorkExperiences,
  ];

  const reorderAndFilterExperiences = filterAndReorderExperiencesBy({
    companyName: experience.company.name,
    jobTitle: experience.job_title.name,
  });

  const rejectCurrentExperience = rejectById(experience._id);

  return R.compose(
    rejectCurrentExperience,
    reorderAndFilterExperiences,
  )(experiences);
};

export default getRelatedExperiences;
