import R from 'ramda';

import {
  ifThenLog,
} from 'utils/debugUtil';

const ifFalseLog = ifThenLog(n => n === false);

export const aboutThisJob = R.allPass([
]);

export const extraField = R.allPass([
]);

export const campaignExtendedFormCheck = extraFields => R.allPass([
  R.compose(
    ifFalseLog('aboutThisJob not pass'),
    aboutThisJob,
    R.prop('aboutThisJob')
  ),
  R.allPass(
    extraFields.map(({ key }) =>
      R.compose(
        ifFalseLog(`${key} not pass`),
        extraField,
        R.prop(key)
      ),
    )
  ),
]);
