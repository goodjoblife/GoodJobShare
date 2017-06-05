import React, { PropTypes } from 'react';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';
import InputTitle from './InputTitle';
import {
  getCompaniesSearch,
} from '../../../apis/companySearchApi';

const getItemValue = item =>
  (Array.isArray(item.name) ? item.name[0] : item.name);

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
          renderItem={(item, isHighlighted) =>
            <div
              key={item.id}
              style={{ background: isHighlighted ? 'lightgray' : 'white' }}
            >
              {item.name}
            </div>
          }
          getItemValue={getItemValue}
          items={autocompleteItems}
          onChange={(e, value) => {
            onChange(e.target.value);
            return getCompaniesSearch(value)
              .then(r => (Array.isArray(r) ? this.handleAutocompleteItems(r) : this.handleAutocompleteItems([])))
              .catch(() => this.handleAutocompleteItems([]));
          }}
          onSelect={(value, item) => {
            this.handleAutocompleteItems([]);
            onCompanyId(item.id);
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
