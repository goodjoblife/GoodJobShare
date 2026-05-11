import React, { useRef } from 'react';
import Loader from 'common/Loader';
import FetchBox, { isUnfetched, isFetching, isError } from 'utils/fetchBox';
import FadeInContent from './FadeInContent';

type BoxesRendererProps<T extends unknown[]> = {
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
// use a BoxRenderer component that wraps BoxesRenderer with single box or box array.
export default function BoxesRenderer<T extends unknown[]>({
  boxes,
  render,
}: BoxesRendererProps<T>): React.ReactNode {
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
