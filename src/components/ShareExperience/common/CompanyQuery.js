import React, { PropTypes } from 'react';
import { Element as ScrollElement } from 'react-scroll';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';

import {
  debounce,
} from 'utils/streamUtils';

import InputTitle from './InputTitle';
import {
  getCompaniesSearch,
} from '../../../apis/companySearchApi';

import { VALID, INVALID, COMPANY } from '../../../constants/formElements';

const getItemValue = item => item.label;

const mapToAutocompleteList = l => ({
  label: Array.isArray(l.name) ? l.name[0] : l.name,
  value: l.id,
});

class CompanyQuery extends React.Component {
  constructor(props) {
    super(props);

    this.handleAutocompleteItems = this.handleAutocompleteItems.bind(this);

    const search = debounce(
      (e, value) => {
        if (value) {
          return getCompaniesSearch(value)
            .then(r => (Array.isArray(r) ? this.handleAutocompleteItems(r.map(mapToAutocompleteList)) : this.handleAutocompleteItems([])))
            .catch(() => this.handleAutocompleteItems([]));
        }
        return this.handleAutocompleteItems([]);
      }
      , 800
    );

    this.handleOnChange = (e, value) => {
      props.onChange(e.target.value);
      return search(e, value);
    };

    const isValid = props.validator(props.companyQuery);
    props.changeValidationStatus(COMPANY, isValid ? VALID : INVALID);
    this.state = {
      autocompleteItems: [],
      isValid,
    };
  }

  componentWillReceiveProps(nextProps) {
    const isValid = this.props.validator(nextProps.companyQuery);
    if (isValid !== this.state.isValid) {
      this.setState({ isValid });
      const status = isValid ? VALID : INVALID;
      this.props.changeValidationStatus(COMPANY, status);
    }
  }

  handleAutocompleteItems(autocompleteItems) {
    return this.setState(() => ({
      autocompleteItems,
    }));
  }

  render() {
    const { autocompleteItems } = this.state;
    const { companyQuery, onChange, onCompanyId, submitted } = this.props;
    return (
      <div>
        <ScrollElement name={COMPANY} />
        <InputTitle
          text="公司/單位 或 統一編號"
          must
        />
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
          isWarning={submitted && !this.state.isValid}
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
  changeValidationStatus: PropTypes.func,
};

CompanyQuery.defaultProps = {
  validator: () => {},
};

export default CompanyQuery;
