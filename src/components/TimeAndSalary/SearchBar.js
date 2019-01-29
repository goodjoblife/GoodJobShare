import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import R from 'ramda';
import ReactPixel from 'react-facebook-pixel';
import { withRouter } from 'react-router-dom';

import Radio from 'common/form/Radio';
import { debounce } from 'utils/streamUtils';
import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';
import Magnifiner from 'common/icons/Magnifiner';

import styles from './SearchBar.module.css';
import searchBarStyles from '../ExperienceSearch/Searchbar.module.css';
import {
  fetchCompanyCandidates,
  fetchJobTitleCandidates,
} from '../../apis/timeAndSalaryApi';

import PIXEL_CONTENT_CATEGORY from '../../constants/pixelConstants';

const searchOptions = [
  { label: '公司', value: 'company' },
  { label: '職稱', value: 'job-title' },
];

class SearchBar extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  state = {
    searchType: 'company',
    keyword: '',
    candidates: [],
  };

  componentDidMount() {
    // TODO 將路由的資訊反映到搜尋選項
    /* const view = this.props.route.path.split('/')[0];
    if (this.props.view === VIEWS.SEARCH_COMPANY_VIEW && this.state.searchType !== 'company') {
      this.setState({
        searchType: 'company',
      });
    } else if (this.props.view === VIEWS.SEARCH_JOB_TITLE_VIEW && this.state.searchType !== 'job-title') {
      this.setState({
        searchType: 'job-title',
      });
    }
    if (prevProps.keyword !== this.props.keyword) {
      this.setState({
        keyword: this.props.keyword,
      });
    } */
  }

  handleTypeChange(e) {
    this.setState({
      searchType: e.target.value,
      candidates: [],
    });
  }

  handleKeywordChange(e) {
    this.setState({
      keyword: e.target.value,
    });
    this.searchKeyword(e.target.value);
  }

  fetchCandidates = value => {
    const { searchType } = this.state;
    if (searchType === 'company') {
      return fetchCompanyCandidates(value).then(r =>
        r.map(({ _id: { name } }) => ({
          label: name,
          value: name,
        })),
      );
    }
    return fetchJobTitleCandidates(value).then(r =>
      r.map(({ _id: name }) => ({
        label: name,
        value: name,
      })),
    );
  };

  searchKeyword = debounce(value => {
    if (!value) {
      this.setState({ candidates: [] });
      return;
    }
    this.fetchCandidates(value)
      .then(candidates => {
        this.setState({ candidates });
      })
      .catch(() => {
        this.setState({ candidates: [] });
      });
  }, 500);

  handleSelectCandidate = keyword => {
    this.setState({
      candidates: [],
      keyword,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    const { searchType, keyword } = this.state;
    this.props.history.push(
      `/time-and-salary/${searchType}/${encodeURIComponent(
        keyword,
      )}/work-time-dashboard`,
    );

    ReactPixel.track('Search', {
      search_string: keyword,
      content_category: PIXEL_CONTENT_CATEGORY.SEARCH_TIME_AND_SALARY,
    });
  }
  render() {
    const { keyword, searchType, candidates } = this.state;
    return (
      <form
        className={cn(
          styles.section,
          styles.showSearchbar,
          searchBarStyles.searchbar,
        )}
        onSubmit={this.handleSubmit}
      >
        <div className={styles.type}>
          {searchOptions.map(({ label, value }) => (
            <Radio
              key={value}
              label={label}
              value={value}
              inline
              checked={searchType === value}
              onChange={this.handleTypeChange}
            />
          ))}
        </div>
        <div className={styles.form}>
          <div className={searchBarStyles.search}>
            <div className={styles.inputWrapper}>
              <AutoCompleteTextInput
                value={keyword}
                onChange={this.handleKeywordChange}
                placeholder={`以${
                  searchType === 'company' ? '公司' : '職稱'
                }搜尋`}
                items={candidates}
                getItemValue={R.prop('label')}
                onSelect={this.handleSelectCandidate}
              />
              <button
                type="submit"
                className={cn(searchBarStyles.searchBtn, styles.searchBtn)}
              >
                <Magnifiner />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(SearchBar);
