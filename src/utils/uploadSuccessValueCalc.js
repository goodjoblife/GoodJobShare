/**
 * 計算使用者寫的一篇面試經驗的價值，作為 GA 事件的價值
 * @param {Object} experience
 * @param {Number} defaultTextLength 預設文字的長度，包含章節的標題、內文
 */
const calcInterviewExperienceValue = (experience, defaultTextLength = 0) => {
  let value = 0;
  const valueMap = {
    company: 10,
    region: 5,
    job_title: 10,
    interview_time: 10,
    experience_in_year: 10,
    interview_result: 5,
    salary: 10,
    overall_rating: 5,
    interview_sensitive_questions: 5,
  };
  for (let key of Object.keys(valueMap)) {
    if (experience.hasOwnProperty(key)) {
      if (
        (Array.isArray(experience[key]) && experience[key].length === 0) ||
        Number.isNaN(experience[key]) ||
        experience[key] === undefined
      ) {
        continue;
      }
      value += valueMap[key];
    }
  }

  let sectionLength = 0;
  if (experience.sections) {
    sectionLength = experience.sections.reduce((accuValue, currSection) => {
      if (currSection.subtitle && currSection.content) {
        return (
          accuValue + currSection.subtitle.length + currSection.content.length
        );
      } else {
        return accuValue;
      }
    }, 0);
  }

  let qaLength = 0;
  if (experience.interview_qas) {
    qaLength = experience.interview_qas.reduce((accuValue, currQuestion) => {
      let value = accuValue;
      if (currQuestion.question) {
        value += currQuestion.question.length;
      }
      if (currQuestion.answer) {
        value += currQuestion.answer.length;
      }
      return value;
    }, 0);
  }

  return value + sectionLength + qaLength - defaultTextLength;
};

export { calcInterviewExperienceValue };
