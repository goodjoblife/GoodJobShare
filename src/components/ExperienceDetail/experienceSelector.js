import R from 'ramda';

const typeMapping = {
  interview: '面試經驗分享',
  work: '工作經驗分享',
  intern: '實習經驗分享',
};

const salaryMapping = {
  year: '年',
  month: '月',
  day: '日',
  hour: '小時',
};

export const companyNameSelector = R.pathOr(null, ['company', 'name']);
export const jobTitleSelector = R.pathOr(null, ['job_title', 'name']);
export const typeSelector = experience =>
  R.propOr(null, experience.type, typeMapping);
export const dateSelector = experience => {
  if (experience.created_at) {
    const t = new Date(experience.created_at);
    return `${t.getFullYear()}.${t.getMonth() + 1}.${t.getDate()}`;
  } else {
    return null;
  }
};
export const interviewYearSelector = R.pathOr(null, ['interview_time', 'year']);
export const interviewMonthSelector = R.pathOr(null, [
  'interview_time',
  'month',
]);
export const salaryAmountSelector = R.pathOr(null, ['salary', 'amount']);
export const salaryTypeSelector = R.pathOr(null, ['salary', 'type']);

export const metaTitleSelector = experience => {
  return `${companyNameSelector(experience)} ${jobTitleSelector(
    experience,
  )} ${typeSelector(experience)} ${dateSelector(experience)}`;
};

export const metaDescriptionSelector = (experience, maxLength) => {
  if (experience) {
    if (experience.type === 'interview') {
      return interviewMetaDescriptionSelector(experience, maxLength);
    } else if (experience.type === 'work') {
      return workMetaDescriptionSelector(experience, maxLength);
    } else if (experience.type === 'intern') {
      return null;
      // return internMetaDescriptionSelector(experience, maxLength);
    }
  }
  return null;
};

const interviewMetaDescriptionSelector = (experience, maxLength) => {
  if (experience) {
    let content = '';
    const {
      region,
      experience_in_year,
      interview_result,
      sections,
    } = experience;
    const interviewYear = interviewYearSelector(experience);
    const interviewMonth = interviewMonthSelector(experience);
    const salaryAmount = salaryAmountSelector(experience);
    const salaryType = salaryTypeSelector(experience);
    if (region) {
      content += `面試地區：${region}。`;
    }
    if (experience.experience_in_year) {
      content += `相關職務工作經驗：${experience_in_year} 年。`;
    }
    if (interviewYear && interviewMonth) {
      content += `面試時間：${interviewYear} 年 ${interviewMonth} 月。`;
    }
    if (interview_result) {
      content += `面試結果：${interview_result}。`;
    }
    if (salaryAmount && salaryType) {
      content += `薪水：每個${
        salaryMapping[salaryType]
      }新台幣 ${salaryAmount} 元。`;
    }
    if (sections) {
      for (let section of sections) {
        content += `${section.subtitle}：${section.content.replace(
          /(\r\n|\n|\r)/gm,
          ' ',
        )}。`;
      }
    }
    return maxLength < 0 ? content : content.slice(0, maxLength);
  }
  return null;
};

const workMetaDescriptionSelector = (experience, maxLength) => {
  if (experience) {
    let content = '';
    const { region, experience_in_year, sections } = experience;
    const salaryAmount = salaryAmountSelector(experience);
    const salaryType = salaryTypeSelector(experience);
    if (region) {
      content += `工作地區：${region}。`;
    }
    if (experience.experience_in_year) {
      content += `相關職務工作經驗：${experience_in_year} 年。`;
    }
    if (experience.education) {
      content += `最高學歷：${experience.education}。`;
    }
    if (experience.week_work_time) {
      content += `每週工時：${experience.week_work_time} 小時。`;
    }
    if (salaryAmount && salaryType) {
      content += `薪水：每個${
        salaryMapping[salaryType]
      }新台幣 ${salaryAmount} 元。`;
    }
    if (sections) {
      for (let section of sections) {
        content += `${section.subtitle}：${section.content.replace(
          /(\r\n|\n|\r)/gm,
          ' ',
        )}。`;
      }
    }
    return maxLength < 0 ? content : content.slice(0, maxLength);
  }
  return null;
};
