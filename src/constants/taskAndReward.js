import { dataType, dataTypeText } from './dataType';
import { unlockExperience } from '../apis/taskAndRewardApi';

/**
 * This file contains constants from back-end server
 * In the future, it's better to use common configuration
 * for both front-end and back-end.
 */

export const dataTypeToRewardMap = {
  [dataType.interview]: 'UnlockExperience',
  [dataType.work]: 'UnlockExperience',
  [dataType.salaryWorkTime]: 'UnlockSalaryWorkTime',
};

export const dataTypeToTaskMap = {
  [dataType.interview]: 'CreateInterviewExperience',
  [dataType.work]: 'CreateWorkExperience',
  [dataType.salaryWorkTime]: 'CreateSalaryWorkTime',
};

export const dataTypeToCTAText = {
  [dataType.interview]: `分享${dataTypeText[dataType.interview]}`,
  [dataType.work]: `分享${dataTypeText[dataType.work]}`,
  [dataType.salaryWorkTime]: `分享${dataTypeText[dataType.salaryWorkTime]}`,
};

export const rewardToApiMap = {
  UnlockExperience: unlockExperience,
};

export const mainTaskDataType = dataType.interview;
export const mainTaskId = dataTypeToTaskMap[mainTaskDataType];
export const getMainTaskLink = companyName => {
  if (companyName) {
    return { state: { share: mainTaskDataType, companyName } };
  } else {
    return { state: { share: mainTaskDataType } };
  }
};
export const mainCTAText = dataTypeToCTAText[mainTaskDataType];
