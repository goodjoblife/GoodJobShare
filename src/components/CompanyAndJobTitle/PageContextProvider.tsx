import React, { createContext, useContext, useMemo } from 'react';

import { PageType } from 'constants/companyJobTitle';

type PageContextValue = {
  pageType: PageType;
  pageName: string;
};

// undefined 代表不在 CompanyAndJobTitleWrapper 之下，由 usePageContext 擋下
const PageContext = createContext<PageContextValue | undefined>(undefined);

type PageContextProviderProps = React.PropsWithChildren<PageContextValue>;

export const PageContextProvider: React.FC<PageContextProviderProps> = ({
  pageType,
  pageName,
  children,
}) => {
  const value = useMemo(() => ({ pageType, pageName }), [pageType, pageName]);
  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
};

export const usePageContext = (): PageContextValue => {
  const value = useContext(PageContext);
  if (value === undefined) {
    throw new Error(
      'usePageContext 只能用在 CompanyAndJobTitleWrapper 之下（直接渲染 Wrapper 的頁面元件請改用自己的 props）',
    );
  }
  return value;
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
