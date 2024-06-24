import React, { useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';

import { debounce } from 'utils/streamUtils';
import TextInput from '.';

import { fetchSearchCompany, fetchSearchJobTitle } from 'apis/timeAndSalaryApi';
import AutoCompleteItem from 'components/ShareExperience/AutoCompleteItem';
import { pageType as PAGE_TYPE } from 'constants/companyJobTitle';

const take5 = R.take(5);

const SearchTextInput = ({ value, onChange, onSelected, ...restProps }) => {
  const [candidates, setCandidates] = useState([]);
  const eleRef = useRef(null);

  const searchCompanyNames = useCallback(
    value => fetchSearchCompany({ companyName: value, hasData: true }),
    [],
  );
  const searchJobTitles = useCallback(
    value =>
      fetchSearchJobTitle({ jobTitle: value }).then(jobTitles =>
        jobTitles.map(({ name }) => name),
      ),
    [],
  );

  const performSearch = useCallback(
    debounce(async value => {
      if (value) {
        try {
          const [companies, jobTitles] = await Promise.all([
            searchCompanyNames(value),
            searchJobTitles(value),
          ]);
          const candidates = R.uniqBy(R.prop('value'), [
            ...take5(companies).map(({ name, businessNumber }) => ({
              label: (
                <AutoCompleteItem
                  pageType={PAGE_TYPE.COMPANY}
                  name={name}
                  businessNumber={businessNumber}
                />
              ),
              value: name,
            })),
            ...take5(jobTitles).map(name => ({
              label: (
                <AutoCompleteItem pageType={PAGE_TYPE.JOB_TITLE} name={name} />
              ),
              value: name,
            })),
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
    item => {
      const companyName = item.value;
      onChange(companyName);
      if (onSelected) {
        onSelected(companyName);
      }
    },
    [onChange, onSelected],
  );

  return (
    <TextInput
      {...restProps}
      ref={eleRef}
      value={value}
      onChange={handleValueChange}
      autocompleteItems={candidates}
      onAutocompleteItemSelected={handleCompanyNameSelected}
      autocompleteItemKeySelector={R.prop('value')}
      autocompleteItemLabelSelector={R.prop('label')}
    />
  );
};

SearchTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSelected: PropTypes.func,
  value: PropTypes.string.isRequired,
};

export default SearchTextInput;
