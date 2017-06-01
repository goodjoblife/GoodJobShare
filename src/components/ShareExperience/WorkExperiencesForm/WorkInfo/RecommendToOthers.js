import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroupImage from 'common/button/ButtonGroupImage';

import Cross from '../../../images/x.svg';


import InputTitle from '../../common/InputTitle';

const recommendToOthersOptions = [
  {
    label: '推',
    value: 'yes',
    icon: <Cross />,
  },
  {
    label: '不推',
    value: 'no',
    icon: <Cross />,
  },
  {
    label: '難說喔',
    value: "don't know",
    icon: <Cross />,
  },
];

const RecommendToOthers = ({ recommendToOthers, onChange }) => (
  <div>
    <div
      style={{
        marginBottom: '18px',
      }}
    >
      <InputTitle
        text="你會推薦此工作嗎？"
      />
    </div>
    <ButtonGroupImage
      value={recommendToOthers}
      options={recommendToOthersOptions}
      onChange={onChange}
    />
  </div>
);

RecommendToOthers.propTypes = {
  recommendToOthers: PropTypes.string,
  onChange: PropTypes.func,
};

export default RecommendToOthers;
