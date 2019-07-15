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

export const pageData = (pageType, pageName) =>
  R.compose(
    R.defaultTo({}),
    R.path([pageType, pageName]),
    R.prop('companyAndJobTitle'),
  );
export const pageStatus = (pageType, pageName) =>
  R.compose(
    status,
    pageData(pageType, pageName),
  );
