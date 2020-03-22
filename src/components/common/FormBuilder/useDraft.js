import { useState } from 'react';
import R from 'ramda';

const defaultValueForType = type => {
  switch (type) {
    case 'text':
      return '';
    case 'textarea':
      return '';
    case 'radio':
      return null;
    case 'checkbox':
      return [];
    case 'rating':
      return null;
    case 'file':
      return '';
    case 'customized':
      return null;
    default:
      return null;
  }
};

const keyByProp = prop =>
  R.compose(
    R.fromPairs,
    R.map(R.converge(R.pair, [R.prop(prop), R.identity])),
  );

const toDraft = R.compose(
  R.map(
    R.compose(
      defaultValueForType,
      R.prop('type'),
    ),
  ),
  keyByProp('dataKey'),
);

const useDraft = questions => {
  const [draft, setDraft] = useState(() => toDraft(questions));

  const setDraftValue = dataKey => value => {
    setDraft({ ...draft, [dataKey]: value });
  };

  return [draft, setDraftValue];
};

export default useDraft;
