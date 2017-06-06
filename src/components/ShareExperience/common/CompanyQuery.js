import React, { PropTypes } from 'react';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';
import InputTitle from './InputTitle';
import {
  getCompaniesSearch,
} from '../../../apis/companySearchApi';

const getItemValue = item => item.label;

const mapToAutocompleteList = l => ({
  label: Array.isArray(l.name) ? l.name[0] : l.name,
  value: l.id,
});

class CompanyQuery extends React.Component {
  constructor(props) {
    super(props);

    this.handleAutocompleteItems = this.handleAutocompleteItems.bind(this);

    this.state = {
      autocompleteItems: [],
    };
  }

  handleAutocompleteItems(autocompleteItems) {
    return this.setState(() => ({
      autocompleteItems,
    }));
  }

  render() {
    const { autocompleteItems } = this.state;
    const { companyQuery, onChange, onCompanyId } = this.props;
    return (
      <div>
        <InputTitle
          text="公司/單位 或 統一編號"
          must
        />
        <AutoCompleteTextInput
          placeholder="ＯＯ 股份有限公司"
          value={companyQuery}
          getItemValue={getItemValue}
          items={autocompleteItems}
          onChange={(e, value) => {
            onChange(e.target.value);
            return getCompaniesSearch(value)
              .then(r => (Array.isArray(r) ? this.handleAutocompleteItems(r.map(mapToAutocompleteList)) : this.handleAutocompleteItems([])))
              .catch(() => this.handleAutocompleteItems([]));
          }}
          onSelect={(value, item) => {
            this.handleAutocompleteItems([]);
            onCompanyId(item.value);
            return onChange(value);
          }}
        />
      </div>
    );
  }
}

CompanyQuery.propTypes = {
  companyQuery: PropTypes.string,
  onChange: PropTypes.func,
  onCompanyId: PropTypes.func,
};

export default CompanyQuery;
