import { useState, useCallback } from 'react';
import R from 'ramda';

const keyByProp = prop =>
  R.compose(
    R.fromPairs,
    R.map(R.converge(R.pair, [R.prop(prop), R.identity])),
  );

const isFunction = R.compose(
  R.equals('Function'),
  R.type,
);

const toDraft = R.compose(
  R.map(
    R.compose(
      R.when(isFunction, R.call),
      R.prop('defaultValue'),
    ),
  ),
  keyByProp('dataKey'),
);

const useDraft = questions => {
  const [draft, setDraft] = useState(() => toDraft(questions));

  const setDraftValue = useCallback(
    dataKey => value => {
      setDraft({ ...draft, [dataKey]: value });
    },
    [draft, setDraft],
  );

  const resetDraft = useCallback(() => {
    setDraft(toDraft(questions));
  }, [questions]);

  return [draft, setDraftValue, resetDraft];
};

export default useDraft;
