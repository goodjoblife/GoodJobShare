import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroupImage from 'common/button/ButtonGroupImage';

import Good from 'common/icons/Good';
import Bad from 'common/icons/Bad';

import InputTitle from '../../common/InputTitle';

const recommendToOthersOptions = [
  {
    label: '推',
    value: 'yes',
    icon: (
      <Good
        style={{
          width: '30px',
          height: '30px',
        }}
      />
    ),
  },
  {
    label: '不推',
    value: 'no',
    icon: (
      <Bad
        style={{
          width: '30px',
          height: '30px',
        }}
      />
    ),
  },
];

const RecommendToOthers = ({ recommendToOthers, onChange }) => (
  <div>
    <InputTitle text="你會推薦此工作嗎？" />
    <ButtonGroupImage
      value={recommendToOthers}
      options={recommendToOthersOptions}
      onChange={onChange}
    />
  </div>
);

RecommendToOthers.propTypes = {
  onChange: PropTypes.func,
  recommendToOthers: PropTypes.string,
};

export default RecommendToOthers;
