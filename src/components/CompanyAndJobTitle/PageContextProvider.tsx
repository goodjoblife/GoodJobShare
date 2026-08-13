import React, { createContext, useContext, useMemo } from 'react';

import { PageType, TabType } from 'constants/companyJobTitle';

// 「你在哪一頁」：頁面型別、頁面名稱、目前的 tab。三者都由 route 決定，
// 在整個頁面的生命週期內固定，故一起放進 context
type PageContextValue = {
  pageType: PageType;
  pageName: string;
  tabType: TabType;
};

// undefined 代表不在 CompanyAndJobTitleWrapper 之下，由 usePageContext 擋下
const PageContext = createContext<PageContextValue | undefined>(undefined);

type PageContextProviderProps = React.PropsWithChildren<PageContextValue>;

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  pageType,
  pageName,
  tabType,
  children,
}) => {
  const value = useMemo(() => ({ pageType, pageName, tabType }), [
    pageType,
    pageName,
    tabType,
  ]);
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContextValue => {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageContext 只能用在 CompanyAndJobTitleWrapper 之下');
  }
  return context;
};

// 公司名只有公司頁有。在職稱頁呼叫代表元件被掛在不該掛的地方，
// 與其回傳一個假的名字往下傳，不如當場失敗
export const useCompanyName = (): string => {
  const { pageType, pageName } = usePageContext();
  if (pageType !== PageType.COMPANY) {
    throw new Error(`useCompanyName 只能用在公司頁，目前的頁面是 ${pageType}`);
  }
  return pageName;
};
