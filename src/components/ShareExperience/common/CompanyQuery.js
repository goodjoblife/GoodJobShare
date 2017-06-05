import React, { PropTypes } from 'react';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';
import InputTitle from './InputTitle';

const CompanyQuery = ({ companyQuery, onChange }) => (
  <div>
    <InputTitle
      text="公司/單位 或 統一編號"
      must
    />
    <AutoCompleteTextInput
      placeholder="ＯＯ 股份有限公司"
      value={companyQuery}
      onChange={e => onChange(e.target.value)}
      renderItem={() => {}}
      getItemValue={() => {}}
      items={[]}
    />
  </div>
);

CompanyQuery.propTypes = {
  companyQuery: PropTypes.string,
  onChange: PropTypes.func,
};

export default CompanyQuery;
