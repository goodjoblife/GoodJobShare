import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { debounce } from 'utils/streamUtils';
import AutoCompleteTextInput from '.';

import { fetchCompanyCandidates } from '../../../../apis/timeAndSalaryApi';

const AutoCompleteCompanyNameTextInput = ({
  value,
  onChange,
  onCompanyNameSelected,
  ...restProps
}) => {
  const [companyNames, setCompanyNames] = useState([]);
  const eleRef = useRef(null);

  const performSearch = useCallback(
    debounce(async value => {
      if (value) {
        try {
          const response = await fetchCompanyCandidates({ key: value });
          const companyNames = response.map(({ _id: { name } }) => name);
          if (eleRef.current) {
            setCompanyNames(companyNames);
          }
        } catch (err) {
          if (eleRef.current) {
            setCompanyNames([]);
          }
        }
      } else {
        if (eleRef.current) {
          setCompanyNames([]);
        }
      }
    }, 500),
    [setCompanyNames],
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
      if (onCompanyNameSelected) {
        onCompanyNameSelected(companyName);
      }
    },
    [onChange, onCompanyNameSelected],
  );

  return (
    <AutoCompleteTextInput
      {...restProps}
      ref={eleRef}
      value={value}
      onChange={handleValueChange}
      autocompleteItems={companyNames}
      onAutocompleteItemSelected={handleCompanyNameSelected}
    />
  );
};

AutoCompleteCompanyNameTextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onCompanyNameSelected: PropTypes.func,
};

export default AutoCompleteCompanyNameTextInput;
