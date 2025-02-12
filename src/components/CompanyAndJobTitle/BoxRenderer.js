import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Redirect from 'common/routing/Redirect';
import Loader from 'common/Loader';
import NotFoundStatus from 'common/routing/NotFound';
import { generateTabURL } from 'constants/companyJobTitle';
import { isUnfetched, isFetching, isError } from 'utils/fetchBox';
import EmptyView from './EmptyView';

const BoxRenderer = ({ box, render }) => {
  if (isUnfetched(box)) {
    return null;
  }
  if (isFetching(box)) {
    return <Loader size="s" />;
  }
  if (isError(box)) {
    return null;
  }
  return render();
};

BoxRenderer.propTypes = {
  box: PropTypes.shape({
    data: PropTypes.any,
    error: PropTypes.any,
    status: PropTypes.string.isRequired,
  }).isRequired,
  render: PropTypes.func.isRequired,
};

export default BoxRenderer;

export const PageBoxRenderer = ({
  pageName,
  pageType,
  tabType,
  boxSelector,
  render,
}) => {
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
      render={() => {
        const data = box.data;
        if (data === null) {
          return (
            <NotFoundStatus status={404}>
              <EmptyView pageName={pageName} />
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
        return render();
      }}
    />
  );
};

PageBoxRenderer.propTypes = {
  boxSelector: PropTypes.func.isRequired,
  pageName: PropTypes.string.isRequired,
  pageType: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  tabType: PropTypes.string.isRequired,
};
