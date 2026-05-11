import React, { useEffect, useRef, useState, PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import cn from 'classnames';
import Redirect from 'common/routing/Redirect';
import Loader from 'common/Loader';
import NotFoundStatus from 'common/routing/NotFound';
import { generateTabURL, PageType, TabType } from 'constants/companyJobTitle';
import FetchBox, { isUnfetched, isFetching, isError } from 'utils/fetchBox';
import EmptyView from './EmptyView';
import styles from './StatusRenderer.module.css';

const useFadeIn = (): {
  visible: boolean;
  animating: boolean;
  onTransitionEnd: (e: React.TransitionEvent) => void;
} => {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame((): void => setVisible(true));
    return (): void => cancelAnimationFrame(id);
  }, []);

  const onTransitionEnd = (e: React.TransitionEvent): void => {
    if (e.propertyName === 'transform') setAnimating(false);
  };

  return { visible, animating, onTransitionEnd };
};

const FadeInContent: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const { visible, animating, onTransitionEnd } = useFadeIn();
  return (
    <div
      className={cn({
        [styles['fade-in']]: animating,
        [styles['fade-in--visible']]: animating && visible,
      })}
      onTransitionEnd={onTransitionEnd}
    >
      {children}
    </div>
  );
};

type StatusRendererProps<T extends unknown[]> = {
  boxes: {
    [K in keyof T]: FetchBox<T[K]>;
  };
  render: (data: T) => React.ReactNode;
};

// Not restricting status — covers both FETCHED and FETCHING-with-stale-data.
interface WithData<T> extends FetchBox<T> {
  data: T;
}

// Checks data presence only (not status), matching the WithData contract above.
const boxesHasData = <T extends unknown[]>(
  boxes: { [K in keyof T]: FetchBox<T[K]> },
): boxes is { [K in keyof T]: WithData<T[K]> } => {
  return boxes.every(b => b.data !== undefined);
};

// boxes is typed as an array tuple; supporting a single FetchBox<T> (non-array) variant
// was considered but too complex to type cleanly.
// use a BoxRenderer component that wraps StatusRenderer with single box or box array.
function StatusRenderer<T extends unknown[]>({
  boxes,
  render,
}: StatusRendererProps<T>): React.ReactNode {
  const fetching = boxes.some(isFetching);
  const hasData = boxesHasData(boxes);

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
  // Guards the mixed UNFETCHED+FETCHED case: not fetching, no error, but some boxes still have no data.
  if (!hasData) {
    return null;
  }

  const data = boxes.map(b => b.data) as { [K in keyof T]: T[K] };
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
}

export function BoxRenderer<T>(props: {
  box: FetchBox<T>;
  render: (data: T) => React.ReactNode;
}): React.ReactNode;
export function BoxRenderer<T extends unknown[]>(props: {
  box: { [K in keyof T]: FetchBox<T[K]> };
  render: (data: T) => React.ReactNode;
}): React.ReactNode;
export function BoxRenderer({
  box,
  render,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  box: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render: (data: any) => React.ReactNode;
}): React.ReactNode {
  if (Array.isArray(box)) {
    return <StatusRenderer boxes={box} render={render} />;
  }
  return (
    <StatusRenderer
      boxes={[box]}
      render={([data]): React.ReactNode => render(data)}
    />
  );
}

export default BoxRenderer;

interface PageData {
  name: string;
  [key: string]: unknown;
}

interface PageBoxRendererProps<T extends PageData> {
  pageName: string;
  pageType: PageType;
  tabType: TabType;
  boxSelector: (state: RootState) => FetchBox<T>;
  render: (data: NonNullable<T>) => React.ReactNode;
}

export const PageBoxRenderer = <T extends PageData>({
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
    <StatusRenderer
      boxes={[box]}
      render={([data]): React.ReactNode => {
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
