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

export const company = companyName =>
  R.compose(
    R.defaultTo({}),
    R.path(['company', companyName]),
  );
export const companyStatus = companyName =>
  R.compose(
    status,
    company(companyName),
  );
