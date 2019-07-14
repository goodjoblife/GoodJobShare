import R from 'ramda';

export const status = state => state.companyAndJobTitle.status;
export const pageType = state => state.companyAndJobTitle.pageType;
export const pageName = state => state.companyAndJobTitle.pageName;
const data = state => state.companyAndJobTitle.data;
const interviewExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('interview_experiences')),
);

export default { status, data, interviewExperiences };
