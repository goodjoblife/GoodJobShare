import { generateStr } from 'utils/mockUtil';

import {
  companyQuery,
  region,
  jobTitle,
  experienceInYear,
  interviewTimeYear,
  interviewTimeMonth,
  interviewResult,
  salaryAmount,
  overallRating,
  title,
  singleSection,
  sections,
  singleInterviewQa,
  interviewQas,
  interviewSensitiveQuestions,
  interviewFormCheck,
} from './formCheck';

import { getInterviewForm } from '../utils';

describe('companyQuery test', () => {
  test('non-empty string should pass', () => {
    expect(companyQuery('台積電')).toBe(true);
  });

  test('empty string should not pass', () => {
    expect(companyQuery('')).toBe(false);
  });
});

describe('region test', () => {
  test('non-empty should pass', () => {
    expect(region('台北市')).toBe(true);
  });

  test('empty string should not pass', () => {
    expect(region('')).toBe(false);
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

describe('interviewTimeYear test', () => {
  test('non-null should pass', () => {
    expect(interviewTimeYear(5)).toBe(true);
  });

  test('null should not pass', () => {
    expect(interviewTimeYear(null)).toBe(false);
  });
});

describe('interviewTimeMonth test', () => {
  test('non-null should pass', () => {
    expect(interviewTimeMonth(5)).toBe(true);
  });

  test('null should not pass', () => {
    expect(interviewTimeMonth(null)).toBe(false);
  });
});

describe('interviewResult test', () => {
  test('string length in (0, 100] should pass', () => {
    expect(interviewResult('abcdeabcde')).toBe(true);
    expect(interviewResult('abc')).toBe(true);
  });

  test('string length not in (0, 100] should not pass', () => {
    expect(interviewResult('')).toBe(false);
    expect(interviewResult(new Array(110).join('a'))).toBe(false);
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

describe('overallRating test', () => {
  test('n in [1, 5] should pass', () => {
    expect(overallRating(1)).toBe(true);
    expect(overallRating(3)).toBe(true);
    expect(overallRating(5)).toBe(true);
  });

  test(' n not in [1, 5] should not pass', () => {
    expect(overallRating(-1)).toBe(false);
    expect(overallRating(0)).toBe(false);
    expect(overallRating(6)).toBe(false);
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

describe('singleQa and qas tests', () => {
  const normalQa = {
    question: 'test',
    answer: 'test',
  };

  const sectionTooLongQuestion = {
    ...normalQa,
    question: generateStr(300)('a'),
  };

  const sectionEmptyQuestion = {
    ...normalQa,
    question: '',
  };

  const sectionTooLongAnswer = {
    ...normalQa,
    answer: generateStr(5500)('a'),
  };

  const sectionEmptyAnswer = {
    ...normalQa,
    answer: '',
  };

  test('singleInterviewQa subtitle tests', () => {
    expect(singleInterviewQa(normalQa)).toBe(true);
    expect(singleInterviewQa(sectionTooLongQuestion)).toBe(false);
    expect(singleInterviewQa(sectionEmptyQuestion)).toBe(false);
  });

  test('singleInterviewQa content tests', () => {
    expect(singleInterviewQa(sectionTooLongAnswer)).toBe(false);
    expect(singleInterviewQa(sectionEmptyAnswer)).toBe(true);
  });

  test('interviewQas pass', () => {
    expect(interviewQas([normalQa, normalQa])).toBe(true);
    expect(interviewQas([])).toBe(true);
  });

  test('interviewQas not pass', () => {
    expect(interviewQas([normalQa, sectionTooLongQuestion])).toBe(false);
    expect(interviewQas([normalQa, sectionEmptyQuestion])).toBe(false);
    expect(interviewQas([normalQa, sectionTooLongAnswer])).toBe(false);
  });
});

describe('interviewSensitiveQuestions test', () => {
  test('element string length in (0, 20] should pass', () => {
    expect(interviewSensitiveQuestions(['abcdeabcde'])).toBe(true);
    expect(interviewSensitiveQuestions(['abcdeabcdeabcdeabcde'])).toBe(true);
    expect(interviewSensitiveQuestions(['abc'])).toBe(true);
  });

  test('element string length not in (0, 20] should not pass', () => {
    expect(
      interviewSensitiveQuestions(['abcdeabcdeabcdeabcdeabcdeabcde']),
    ).toBe(false);
    expect(interviewSensitiveQuestions([''])).toBe(false);
  });
});

describe('interviewFormCheck tests', () => {
  const defaultForm = {
    companyQuery: '',
    companyId: '',
    region: '',
    jobTitle: '',
    experienceInYear: null,
    education: null,
    interviewTimeYear: null,
    interviewTimeMonth: null,
    interviewResult: null,
    salaryType: 'month',
    salaryAmount: '',
    overallRating: 0,
    title: '面試經驗分享',
    sections: {
      1: {
        subtitle: '',
        content: '',
      },
    },
    interviewQas: {
      2: {
        question: '',
        answer: '',
      },
    },
    interviewSensitiveQuestions: [],
  };

  test('defaultForm should not pass', () => {
    expect(interviewFormCheck(getInterviewForm(defaultForm))).toBe(false);
  });

  test('all fill and fit to rules should pass', () => {
    const form = {
      ...defaultForm,
      companyQuery: '台積電',
      region: '台北市',
      jobTitle: '硬體工程師',
      experienceInYear: 1,
      education: '大學',
      interviewTimeYear: 2015,
      interviewTimeMonth: 1,
      interviewResult: '錄取',
      salaryType: 'month',
      salaryAmount: 50000,
      overallRating: 1,
      title: '面試經驗分享',
      sections: {
        1: {
          subtitle: 'test',
          content: 'test',
        },
      },
      interviewQas: {
        2: {
          question: 'test',
          answer: 'test',
        },
      },
      interviewSensitiveQuestions: ['曾詢問婚姻狀況、生育計畫'],
    };
    expect(interviewFormCheck(getInterviewForm(form))).toBe(true);
  });

  test('just fill and fit to rules should pass', () => {
    const justFillForm = {
      ...defaultForm,
      companyQuery: '台積電',
      region: '台北市',
      jobTitle: '硬體工程師',
      interviewTimeYear: 2015,
      interviewTimeMonth: 1,
      interviewResult: '錄取',
      overallRating: 1,
      title: '面試經驗分享',
      sections: {
        1: {
          subtitle: 'test',
          content: 'test',
        },
      },
    };

    expect(interviewFormCheck(getInterviewForm(justFillForm))).toBe(true);
  });
});
