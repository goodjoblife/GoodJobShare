import React from 'react';
import { useSelector } from 'react-redux';

import NotFoundStatus from 'common/routing/NotFound';
import Redirect from 'common/routing/Redirect';
import BoxRenderer from 'common/StatusRenderer';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';
import { RootState } from 'reducers';
import FetchBox from 'utils/fetchBox';

import EmptyView from './EmptyView';

interface PageData {
  name: string;
  [key: string]: unknown;
}

interface PageBoxRendererProps<T extends PageData> {
  pageName: string;
  pageType: PageType;
  tabType: TabType;
  boxSelector: (state: RootState) => FetchBox<T | null>;
  render: (data: T) => React.ReactNode;
}

const PageBoxRenderer = <T extends PageData>({
  pageName,
  pageType,
  tabType,
  boxSelector,
  render,
}: PageBoxRendererProps<T>): React.ReactNode => {
  /* 處理
   * 1. 當 fetching                   --> 應顯示 Loading (目前由 BoxRenderer 處理)
   * 2. 當 box.data === null          --> 應顯示 NotFoundStatus (後端無公司)
   * 3. 當 box.data.name !== pageName --> 應 Redirect (done)
   * 4. 當 box.data.dataCount === 0   --> 應顯示 NotFoundStatus (後端無資料)
   * 5. 當 box.data.資料 === []       --> 應顯示 NotFoundStatus (通常是 pagination 超出範圍) (交給 render 處理)
   */
  const box = useSelector(boxSelector);
  return (
    <BoxRenderer
      box={box}
      render={(data): React.ReactNode => {
        if (!data) {
          return (
            <NotFoundStatus status={404}>
              <EmptyView pageName={pageName} tabType={tabType} />
            </NotFoundStatus>
          );
        }
        if (data.name !== pageName) {
          const path = generateTabURL({
            pageType,
            pageName: data.name,
            tabType,
          });
          return <Redirect to={path} />;
        }
        return render(data);
      }}
    />
  );
};

export default PageBoxRenderer;
