import { createCompanyQuestion } from 'components/ShareExperience/questionCreators';

import { generateSharePolicyForm } from './shareLinkTo';

describe('generateSharePolicyForm', () => {
  it('把公司名放進 location state', () => {
    expect(
      generateSharePolicyForm({ companyName: '良興股份有限公司' }),
    ).toEqual({
      state: { share: 'policy', companyName: '良興股份有限公司' },
    });
  });

  it('沒有公司名時只帶表單類型', () => {
    expect(generateSharePolicyForm()).toEqual({ state: { share: 'policy' } });
  });
});

// 分享連結與表單之間只靠 location state 相接：react-router 的 history 會把
// location state 寫進 window.history.state.state，公司名題目再從那裡取預設值
describe('公司名題目的預設值', () => {
  const defaultValueOf = (): string =>
    createCompanyQuestion({ header: null }).defaultValue();

  afterEach(() => {
    window.history.pushState(null, '');
  });

  it('取得分享連結帶上的公司名', () => {
    window.history.pushState(
      generateSharePolicyForm({ companyName: '良興股份有限公司' }),
      '',
    );

    expect(defaultValueOf()).toBe('良興股份有限公司');
  });

  it('分享連結沒帶公司名時留空', () => {
    window.history.pushState(generateSharePolicyForm(), '');

    expect(defaultValueOf()).toBe('');
  });
});
