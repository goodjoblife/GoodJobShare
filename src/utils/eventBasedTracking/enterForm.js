import { getEventBasedTrackingClient } from './__client';

export const types = {
  // 三個步驟的面試經驗表單
  interview3Steps: 'interview3Steps',

  // 只有一頁（一步驟）的表單
  work: 'work',
  salary: 'salary',

  // 一頁一題式（類似 typeform）的表單
  interviewTypeForm: 'interviewTypeForm',
  salaryTypeForm: 'salaryTypeForm',
  workTypeForm: 'workTypeForm',
};

/**
 * step starts from 1
 */
export const sendEvent = ({ type, step = 1 }) => {
  const client = getEventBasedTrackingClient();
  if (client) {
    client.sendEvent('EnterForm', {
      type,
      step,
    });
  }
};
