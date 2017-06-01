import React from 'react';
import PropTypes from 'prop-types';

import ButtonGroupImage from 'common/button/ButtonGroupImage';

import InputTitle from '../../common/InputTitle';

import {
  recommendToOthersOptions,
} from '../../common/optionMap';

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
