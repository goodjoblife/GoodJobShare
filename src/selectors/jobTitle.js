import R from 'ramda';
import STATUS from '../constants/status';

const status = R.compose(
  R.defaultTo(STATUS.UNFETCHED),
  R.prop('status'),
);
const data = state => state.data;
const interviewExperiences = R.pipe(
  data,
  R.when(R.is(Object), R.prop('interview_experiences')),
);

export default { status, data, interviewExperiences };

export const jobTitle = jobTitleName =>
  R.compose(
    R.defaultTo({}),
    R.path(['jobTitle', jobTitleName]),
  );
export const jobTitleStatus = jobTitleName =>
  R.compose(
    status,
    jobTitle(jobTitleName),
  );
