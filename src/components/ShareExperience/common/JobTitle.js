import React from 'react';
import PropTypes from 'prop-types';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';

import { debounce } from 'utils/streamUtils';

import InputTitle from './InputTitle';
import { getJobTitlesSearch } from 'apis/jobTitleSearchApi';

const getItemValue = item => item.label;

const mapToAutocompleteList = l => ({
  label: l,
  value: l,
});

class JobTitle extends React.Component {
  constructor(props) {
    super(props);
    this.handleAutocompleteItems = this.handleAutocompleteItems.bind(this);
    this.state = {
      autocompleteItems: [],
    };
  }

  search = debounce((e, value) => {
    if (value) {
      return getJobTitlesSearch({ key: value })
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
      inputTitle,
      jobTitle,
      onChange,
      validator,
      submitted,
      className,
    } = this.props;
    return (
      <div className={className}>
        <InputTitle text={inputTitle} must />
        <AutoCompleteTextInput
          placeholder="硬體工程師"
          value={jobTitle}
          getItemValue={getItemValue}
          items={autocompleteItems}
          onChange={this.handleOnChange}
          onSelect={value => {
            this.handleAutocompleteItems([]);
            return onChange(value);
          }}
          isWarning={submitted && !validator(jobTitle)}
          warningWording="需填寫職稱"
        />
      </div>
    );
  }
}

JobTitle.propTypes = {
  className: PropTypes.string,
  inputTitle: PropTypes.string,
  jobTitle: PropTypes.string,
  onChange: PropTypes.func,
  submitted: PropTypes.bool,
  validator: PropTypes.func,
};

JobTitle.defaultProps = {
  validator: () => {},
};

export default JobTitle;
