import React from 'react';
import FetchBox from 'utils/fetchBox';
import BoxesRenderer from './BoxesRenderer';

export default function BoxRenderer<T>({
  box,
  render,
}: {
  box: FetchBox<T>;
  render: (data: T) => React.ReactNode;
}): React.ReactNode {
  return (
    <BoxesRenderer
      boxes={[box]}
      render={([data]): React.ReactNode => render(data)}
    />
  );
}
