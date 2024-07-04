import R from 'ramda';
import { formatSalaryType } from 'common/formatter';

const typeMapping = {
  interview: '面試經驗',
  work: '評價',
  intern: '實習心得',
};

const formatCompany = name => {
  if (name) {
    return typeof name === 'string' ? name : name.join(' / ');
  }
  return null;
};

export const originalCompanyNameSelector = R.compose(
  formatCompany,
  R.pathOr(null, ['originalCompanyName']),
);
export const companyNameSelector = R.compose(
  formatCompany,
  R.pathOr(null, ['company', 'name']),
);
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
  return `${originalCompanyNameSelector(experience)} ${jobTitleSelector(
    experience,
  )} ${typeSelector(experience)} ${dateSelector(experience)}`;
};

export const metaDescriptionSelector = experience => {
  if (experience) {
    if (experience.type === 'interview') {
      return interviewMetaDescriptionSelector(experience);
    } else if (experience.type === 'work') {
      return workMetaDescriptionSelector(experience);
    } else if (experience.type === 'intern') {
      return internMetaDescriptionSelector(experience);
    }
  }
  return null;
};

const interviewMetaDescriptionSelector = experience => {
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
      content += `相關職務評價：${experience_in_year} 年。`;
    }
    if (interviewYear && interviewMonth) {
      content += `面試時間：${interviewYear} 年 ${interviewMonth} 月。`;
    }
    if (interview_result) {
      content += `面試結果：${interview_result}。`;
    }
    if (salaryAmount && salaryType) {
      content += `薪水：每個${formatSalaryType(
        salaryType,
      )}新台幣 ${salaryAmount} 元。`;
    }
    if (sections) {
      for (let section of sections) {
        content += `${section.subtitle}：${section.content.replace(
          /(\r\n|\n|\r)/gm,
          ' ',
        )}。`;
      }
    }
    return content;
  }
  return null;
};

const workMetaDescriptionSelector = experience => {
  if (experience) {
    let content = '';
    const { region, experience_in_year, sections } = experience;
    const salaryAmount = salaryAmountSelector(experience);
    const salaryType = salaryTypeSelector(experience);
    if (region) {
      content += `工作地區：${region}。`;
    }
    if (experience.experience_in_year) {
      content += `相關職務評價：${experience_in_year} 年。`;
    }
    if (experience.education) {
      content += `最高學歷：${experience.education}。`;
    }
    if (experience.week_work_time) {
      content += `每週工時：${experience.week_work_time} 小時。`;
    }
    if (salaryAmount && salaryType) {
      content += `薪水：每個${formatSalaryType(
        salaryType,
      )}新台幣 ${salaryAmount} 元。`;
    }
    if (sections) {
      for (let section of sections) {
        content += `${section.subtitle}：${section.content.replace(
          /(\r\n|\n|\r)/gm,
          ' ',
        )}。`;
      }
    }
    return content;
  }
  return null;
};

const internMetaDescriptionSelector = experience => {
  if (experience) {
    let content = '';
    const { region, sections } = experience;
    const salaryAmount = salaryAmountSelector(experience);
    const salaryType = salaryTypeSelector(experience);
    if (region) {
      content += `實習地區：${region}。`;
    }
    if (experience.education) {
      content += `學歷：${experience.education}。`;
    }
    if (salaryAmount && salaryType) {
      content += `實習薪水：每個${formatSalaryType(
        salaryType,
      )}新台幣 ${salaryAmount} 元。`;
    }
    if (sections) {
      for (let section of sections) {
        content += `${section.subtitle}：${section.content.replace(
          /(\r\n|\n|\r)/gm,
          ' ',
        )}。`;
      }
    }
    return content;
  }
  return null;
};
