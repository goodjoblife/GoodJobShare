import React from 'react';
import PropTypes from 'prop-types';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';

import { debounce } from 'utils/streamUtils';

import InputTitle from './InputTitle';
import { getCompaniesSearch } from '../../../apis/companySearchApi';

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

  search = debounce((e, value) => {
    if (value) {
      return getCompaniesSearch({ key: value })
        .then(
          r =>
            Array.isArray(r)
              ? this.handleAutocompleteItems(r.map(mapToAutocompleteList))
              : this.handleAutocompleteItems([]),
        )
        .catch(() => this.handleAutocompleteItems([]));
    }
    return this.handleAutocompleteItems([]);
  }, 800);

  handleOnChange = (e, value) => {
    this.props.onChange(e.target.value);
    return this.search(e, value);
  };

  handleAutocompleteItems(autocompleteItems) {
    return this.setState(() => ({
      autocompleteItems,
    }));
  }

  render() {
    const { autocompleteItems } = this.state;
    const {
      companyQuery,
      onChange,
      onCompanyId,
      validator,
      submitted,
    } = this.props;
    return (
      <div>
        <InputTitle text="公司名稱" must />
        <AutoCompleteTextInput
          placeholder="ＯＯ 股份有限公司"
          value={companyQuery}
          getItemValue={getItemValue}
          items={autocompleteItems}
          onChange={this.handleOnChange}
          onSelect={(value, item) => {
            this.handleAutocompleteItems([]);
            onCompanyId(item.value);
            return onChange(value);
          }}
          isWarning={submitted && !validator(companyQuery)}
          warningWording="需填寫公司/單位"
        />
      </div>
    );
  }
}

CompanyQuery.propTypes = {
  companyQuery: PropTypes.string,
  onChange: PropTypes.func,
  onCompanyId: PropTypes.func,
  validator: PropTypes.func,
  submitted: PropTypes.bool,
};

CompanyQuery.defaultProps = {
  validator: () => {},
};

export default CompanyQuery;
