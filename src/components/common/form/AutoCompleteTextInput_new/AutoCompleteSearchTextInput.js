import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { debounce } from 'utils/streamUtils';
import AutoCompleteTextInput from '../TextInput';

import {
  fetchCompanyCandidates,
  fetchJobTitleCandidates,
} from '../../../../apis/timeAndSalaryApi';

const take5 = R.take(5);

const AutoCompleteSearchTextInput = ({
  value,
  onChange,
  onSelected,
  ...restProps
}) => {
  const [candidates, setCandidates] = useState([]);
  const eleRef = useRef(null);

  const searchCompanyNames = useCallback(
    value => fetchCompanyCandidates({ key: value }),
    [],
  );
  const searchJobTitles = useCallback(
    value => fetchJobTitleCandidates({ key: value }),
    [],
  );

  const performSearch = useCallback(
    debounce(async value => {
      if (value) {
        try {
          const [companyNames, jobTitles] = await Promise.all([
            searchCompanyNames(value),
            searchJobTitles(value),
          ]);
          const candidates = R.uniq([
            ...take5(companyNames),
            ...take5(jobTitles),
          ]);
          if (eleRef.current) {
            setCandidates(candidates);
          }
        } catch (err) {
          if (eleRef.current) {
            setCandidates([]);
          }
        }
      } else {
        if (eleRef.current) {
          setCandidates([]);
        }
      }
    }, 500),
    [setCandidates],
  );

  const handleValueChange = useCallback(
    e => {
      onChange(e.target.value);
      performSearch(e.target.value);
    },
    [onChange, performSearch],
  );

  const handleCompanyNameSelected = useCallback(
    companyName => {
      onChange(companyName);
      if (onSelected) {
        onSelected(companyName);
      }
    },
    [onChange, onSelected],
  );

  return (
    <AutoCompleteTextInput
      {...restProps}
      ref={eleRef}
      value={value}
      onChange={handleValueChange}
      autocompleteItems={candidates}
      onAutocompleteItemSelected={handleCompanyNameSelected}
    />
  );
};

AutoCompleteSearchTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelected: PropTypes.func,
};

export default AutoCompleteSearchTextInput;
