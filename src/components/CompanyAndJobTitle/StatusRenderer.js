import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Redirect from 'common/routing/Redirect';
import Loader from 'common/Loader';
import NotFoundStatus from 'common/routing/NotFound';
import { generateTabURL } from 'constants/companyJobTitle';
import { isUnfetched, isFetching, isError } from 'utils/fetchBox';
import EmptyView from './EmptyView';

const FadeInContent = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'opacity 0.35s ease, transform 0.35s ease',
      }}
    >
      {children}
    </div>
  );
};

FadeInContent.propTypes = {
  children: PropTypes.node.isRequired,
};

const boxShapePropType = PropTypes.shape({
  data: PropTypes.any,
  error: PropTypes.any,
  status: PropTypes.string.isRequired,
});

const BoxRenderer = ({ box, render }) => {
  const boxes = Array.isArray(box) ? box : [box];
  const fetching = boxes.some(isFetching);
  const hasData = boxes.every(b => b.data !== undefined);

  // Only track loader-only loading phases; overlay phases don't need a fade-in on completion.
  const wasFetchingWithoutDataRef = useRef(false);
  if (fetching) {
    wasFetchingWithoutDataRef.current = !hasData;
  }

  if (boxes.every(isUnfetched)) {
    return null;
  }
  if (fetching && !hasData) {
    return <Loader size="s" />;
  }
  if (!fetching && boxes.some(isError)) {
    return null;
  }

  const data = Array.isArray(box) ? boxes.map(b => b.data) : boxes[0].data;
  const content = render(data);

  const wrappedContent = wasFetchingWithoutDataRef.current ? (
    <FadeInContent>{content}</FadeInContent>
  ) : (
    content
  );

  if (fetching && hasData) {
    return (
      <div style={{ position: 'relative' }}>
        {wrappedContent}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.6)',
            paddingTop: '32px',
          }}
        >
          <Loader size="s" />
        </div>
      </div>
    );
  }

  return wrappedContent;
};

BoxRenderer.propTypes = {
  box: PropTypes.oneOfType([
    boxShapePropType,
    PropTypes.arrayOf(boxShapePropType),
  ]).isRequired,
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
      render={data => {
        if (!data) {
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
        return render(data);
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
