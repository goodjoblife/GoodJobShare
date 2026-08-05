import { useParams } from 'react-router-dom';

// Matches the React Router route params for Company pages.
// companyName 標成 optional：useParams 在非公司頁的路由一樣會回傳物件，
// 少了這個 param 時 decodeURIComponent(undefined) 會得到字串 "undefined"，
// 靜靜地被當成公司名往下傳（redux key、generatePath）。改為明確擋下，
// 讓「不在 /companies/:companyName 之下」的誤用當場失敗而非默默出錯。
type Params = { companyName?: string };

const decodeCompanyName = (companyName: string | undefined): string => {
  if (companyName === undefined) {
    throw new Error(
      'companyName 不存在：useCompanyNameParam / companyNameSelector 只能用在 /companies/:companyName 之下',
    );
  }
  return decodeURIComponent(companyName);
};

export const companyNameSelector = (params: Params): string =>
  decodeCompanyName(params.companyName);

// 名字帶 Param 是為了與 components/CompanyAndJobTitle/PageContextProvider 的
// useCompanyName 區分：那支讀 PageContext，這支讀 route param，只給 Provider 層用
const useCompanyNameParam = (): string =>
  companyNameSelector(useParams<Params>());

export default useCompanyNameParam;
