import R from 'ramda';

const status = state => state.companyAndJobTitle.status;
const data = state => state.companyAndJobTitle.data;
const interviewExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('interview_experiences')),
);

export default { status, data, interviewExperiences };
