import React from 'react';
import PropTypes from 'prop-types';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';

import { debounce } from 'utils/streamUtils';

import InputTitle from './InputTitle';
import { fetchSearchCompany } from 'apis/timeAndSalaryApi';
import AutoCompleteItem from '../AutoCompleteItem';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

const getItemValue = item => item.label;

const mapToAutocompleteList = ({ name, businessNumber }) => ({
  label: (
    <AutoCompleteItem
      pageType={PAGE_TYPE.COMPANY}
      name={name}
      businessNumber={businessNumber}
    />
  ),
  value: name,
  businessNumber,
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
      return fetchSearchCompany({ companyName: value, hasData: false })
        .then(r =>
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
            onCompanyId(item.businessNumber);
            return onChange(item.value);
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
  submitted: PropTypes.bool,
  validator: PropTypes.func,
};

CompanyQuery.defaultProps = {
  validator: () => {},
};

export default CompanyQuery;
