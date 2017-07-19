import React, { PropTypes } from 'react';

import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';

import {
  debounce,
} from 'utils/streamUtils';

import InputTitle from './InputTitle';
import {
  getJobTitlesSearch,
} from '../../../apis/jobTitleSearchApi';

const getItemValue = item => item.label;

const mapToAutocompleteList = l => ({
  label: l.des,
  value: l.des,
});

class JobTitle extends React.Component {
  constructor(props) {
    super(props);

    this.handleAutocompleteItems = this.handleAutocompleteItems.bind(this);

    const search = debounce(
      (e, value) => {
        if (value) {
          return getJobTitlesSearch(value)
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
    const { inputTitle, jobTitle, onChange } = this.props;
    return (
      <div>
        <InputTitle
          text={inputTitle}
          must
        />
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
        />
      </div>
    );
  }
}

JobTitle.propTypes = {
  inputTitle: PropTypes.string,
  jobTitle: PropTypes.string,
  onChange: PropTypes.func,
};

export default JobTitle;
