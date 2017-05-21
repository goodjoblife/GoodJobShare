import React, { PropTypes } from 'react';

import TextInput from 'common/form/TextInput';
import InputTitle from '../../common/InputTitle';

const CompanyQuery = ({ companyQuery, onChange }) => (
  <div>
    <InputTitle
      text="公司/單位 或 統一編號"
      must
    />
    <TextInput
      placeholder="ＯＯ 股份有限公司"
      value={companyQuery}
      onChange={e => onChange(e.target.value)}
    />
  </div>
);

CompanyQuery.propTypes = {
  companyQuery: PropTypes.string,
  onChange: PropTypes.func,
};

export default CompanyQuery;
