import {
  generateStr,
} from 'utils/mockUtil';

import {
  companyQuery,
  region,
  jobTitle,
  experienceInYear,
  salaryAmount,
  title,
  singleSection,
  sections,
  workExperiencesFormCheck,
  weekWorkTime,
} from './formCheck';

import {
  propsWorkExperiencesForm,
} from '../utils';

describe('weekWorkTime tests', () => {
  test('weekWorkTime pass', () => {
    expect(weekWorkTime(40)).toBe(true);
    expect(weekWorkTime(1.5)).toBe(true);
  });

  test('greater than 168 should not pass', () => {
    expect(weekWorkTime(170)).toBe(false);
  });
  test('less than 0 should not pass', () => {
    expect(weekWorkTime(-1)).toBe(false);
  });
});


describe('companyQuery test', () => {
  test('non-empty string should pass', () => {
    expect(companyQuery('台積電')).toBe(true);
  });

  test('empty string should not pass', () => {
    expect(companyQuery('')).toBe(false);
  });
});

describe('region test', () => {
  test('non-null should pass', () => {
    expect(region('台北市')).toBe(true);
  });

  test('null should not pass', () => {
    expect(region(null)).toBe(false);
  });
});

describe('jobTitle test', () => {
  test('non-empty string should pass', () => {
    expect(jobTitle('硬體工程師')).toBe(true);
  });

  test('empty string should not pass', () => {
    expect(jobTitle('')).toBe(false);
  });
});

describe('experienceInYear test', () => {
  test('0 <= n <= 50 should pass', () => {
    expect(experienceInYear(0)).toBe(true);
    expect(experienceInYear(50)).toBe(true);
    expect(experienceInYear(30)).toBe(true);
  });

  test('n which is not 0 <= a <= 50 should not pass', () => {
    expect(experienceInYear(-1)).toBe(false);
    expect(experienceInYear(52)).toBe(false);
  });
});

describe('salaryAmount test', () => {
  test('n >= 0 should pass', () => {
    expect(salaryAmount(0)).toBe(true);
    expect(salaryAmount(100)).toBe(true);
  });

  test('n < 0 should not pass', () => {
    expect(salaryAmount(-1)).toBe(false);
  });
});

describe('title test', () => {
  test('string length in (0, 25] should pass', () => {
    expect(title('abcdeabcde')).toBe(true);
    expect(title('abcdeabcdeabcdeabcdeabcde')).toBe(true);
    expect(title('abc')).toBe(true);
  });

  test('string length not in (0, 25] should not pass', () => {
    expect(title('abcdeabcdeabcdeabcdeabcdeabcde')).toBe(false);
    expect(title('')).toBe(false);
  });
});

describe('singleSection and sections tests', () => {
  const normalSection = {
    subtitle: 'test',
    content: 'test',
  };

  const sectionTooLongSubtitle = {
    ...normalSection,
    subtitle: generateStr(30)('a'),
  };

  const sectionEmptySubtitle = {
    ...normalSection,
    subtitle: '',
  };

  const sectionTooLongContent = {
    ...normalSection,
    content: generateStr(5500)('a'),
  };

  const sectionEmptyContent = {
    ...normalSection,
    content: '',
  };

  test('singleSection subtitle tests', () => {
    expect(singleSection(normalSection)).toBe(true);
    expect(singleSection(sectionTooLongSubtitle)).toBe(false);
    expect(singleSection(sectionEmptySubtitle)).toBe(false);
  });

  test('singleSection content tests', () => {
    expect(singleSection(sectionTooLongContent)).toBe(false);
    expect(singleSection(sectionEmptyContent)).toBe(false);
  });

  test('sections pass', () => {
    expect(sections([normalSection, normalSection])).toBe(true);
  });

  test('sections not pass', () => {
    expect(sections([normalSection, sectionTooLongSubtitle])).toBe(false);
    expect(sections([normalSection, sectionEmptySubtitle])).toBe(false);
    expect(sections([normalSection, sectionTooLongContent])).toBe(false);
    expect(sections([normalSection, sectionEmptyContent])).toBe(false);
    expect(sections([])).toBe(false);
  });
});

describe('interviewFormCheck tests', () => {
  const defaultForm = {
    companyQuery: '',
    region: null,
    jobTitle: '',
    experienceInYear: null,
    education: null,
    isCurrentlyEmployed: 'yes',
    jobEndingTimeYear: new Date().getFullYear(),
    jobEndingTimeMonth: new Date().getMonth(),
    salaryType: 'month',
    salaryAmount: 0,
    weekWorkTime: '',
    recommendToOthers: null,
    title: '',
    sections: {
      1: {
        subtitle: 'test',
        content: 'test',
      },
    },
  };

  test('defaultForm should not pass', () => {
    expect(workExperiencesFormCheck(propsWorkExperiencesForm(defaultForm))).toBe(false);
  });

  test('all fill and fit to rules should pass', () => {
    const form = {
      ...defaultForm,
      companyQuery: '台積電',
      region: '台北市',
      jobTitle: '硬體工程師',
      experienceInYear: 1,
      education: '大學',
      salaryType: 'month',
      salaryAmount: 50000,
      title: '面試經驗',
      weekWorkTime: 40,
      recommendToOthers: 'no',
      sections: {
        1: {
          subtitle: 'test',
          content: 'test',
        },
      },
    };
    expect(workExperiencesFormCheck(propsWorkExperiencesForm(form))).toBe(true);
  });

  test('just fill and fit to rules should pass', () => {
    const justFillForm = {
      ...defaultForm,
      companyQuery: '台積電',
      region: '台北市',
      jobTitle: '硬體工程師',
      title: '面試經驗',
      sections: {
        1: {
          subtitle: 'test',
          content: 'test',
        },
      },
    };

    expect(workExperiencesFormCheck(propsWorkExperiencesForm(justFillForm))).toBe(true);
  });
});
