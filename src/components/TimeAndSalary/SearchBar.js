import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import cn from 'classnames';
import R from 'ramda';

import Radio from 'common/form/Radio';
import { debounce } from 'utils/streamUtils';
import AutoCompleteTextInput from 'common/form/AutoCompleteTextInput';

import styles from './SearchBar.module.css';
import submitButtonStyle from '../common/button/ButtonSubmit.module.css';
import { fetchCompanyCandidates, fetchJobTitleCandidates } from '../../apis/timeAndSalaryApi';

const searchOptions = [
  { label: '公司', value: 'company' },
  { label: '職稱', value: 'job-title' },
];

class SearchBar extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }
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
  }

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

  searchKeyword = debounce(value => {
    if (!value) {
      this.handleAutocompleteItems([]);
      return;
    }
    const { searchType } = this.state;
    let fetchCandidates;
    if (searchType === 'company') {
      fetchCandidates =
        fetchCompanyCandidates(value).then(r =>
          r.map(({ _id: { name } }) => ({
            label: name,
            value: name,
          }))
        );
    } else {
      fetchCandidates =
        fetchJobTitleCandidates(value).then(r =>
          r.map(({ _id: name }) => ({
            label: name,
            value: name,
          }))
        );
    }
    fetchCandidates.then(candidates => {
      this.setState({ candidates });
    }, () => {
      this.setState({ candidates: [] });
    });
  }, 500)

  handleSelectCandidate = keyword => {
    this.setState({
      candidates: [],
      keyword,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { searchType, keyword } = this.state;
    this.props.dispatch(push(
      `/time-and-salary/${searchType}/${encodeURIComponent(keyword)}/work-time-dashboard`,
    ));
  }
  render() {
    const { keyword, searchType, candidates } = this.state;
    return (
      <form className={cn(styles.section, styles.showSearchbar)} onSubmit={this.handleSubmit}>
        <div className={styles.type}>
          {searchOptions.map(({ label, value }) => (
            <Radio
              key={value} label={label} value={value} inline
              checked={searchType === value}
              onChange={this.handleTypeChange}
            />
          ))}
        </div>
        <div className={styles.form}>
          <div className={styles.searchBar}>
            <div style={{ flex: 1 }}>
              <AutoCompleteTextInput
                value={keyword}
                onChange={this.handleKeywordChange}
                placeholder={searchType === 'company' ? '輸入公司 / 單位名稱' : '輸入職稱'}
                items={candidates}
                getItemValue={R.prop('label')}
                onSelect={this.handleSelectCandidate}
              />
            </div>
            <button
              type="submit"
              className={submitButtonStyle.container}
            >
              搜尋
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect()(SearchBar);
