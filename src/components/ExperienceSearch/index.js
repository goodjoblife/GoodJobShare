import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';

import styles from './ExperienceSearch.module.css';
import Search from '../images/search.svg';
// import Alert from '../common/Alert';
import ExperienceBlock from './ExperienceBlock';
import WorkingHourBlock from './WorkingHourBlock';
import Radio from '../common/form/Radio';
import Checkbox from '../common/form/Checkbox';
import { fetchExperiences } from '../../actions/experienceSearch';

// let cmpAlert;

class ExperienceSearch extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(fetchExperiences('sort', ''));
  }

  static propTypes = {
    // setSort: PropTypes.func.isRequired,
    setSearchType: PropTypes.func.isRequired,
    // setIndustry: PropTypes.func.isRequired,
    // setSearchBy: PropTypes.func.isRequired,
    setKeyword: PropTypes.func.isRequired,
    fetchExperiences: PropTypes.func.isRequired,
    fetchWorkings: PropTypes.func.isRequired,
    fetchKeywords: PropTypes.func.isRequired,
    experienceSearch: ImmutablePropTypes.map.isRequired,
  }

  constructor() {
    super();
    this.fetchDataWithSearchBy = this.fetchDataWithSearchBy.bind(this);
    this.fetchExperiencesWithSort = this.fetchExperiencesWithSort.bind(this);
  }

  componentDidMount() {
    this.props.fetchExperiences('sort', '');
    this.props.fetchKeywords('');
  }

  // fetchExperiencesWithSearchBy(e) {
  fetchDataWithSearchBy(e) {
    const val = e.target.innerHTML;
    this.props.fetchExperiences('searchBy', val);
    this.props.fetchWorkings(val);
  }

  fetchExperiencesWithSort(e) {
    this.props.fetchExperiences('sort', e.target.value);
  }

  render() {
    const {
      /* setSort, */ setSearchType, /* setIndustry, */ fetchKeywords, setKeyword,
      experienceSearch,
    } = this.props;
    const data = experienceSearch.toJS();
    console.log('-->', experienceSearch, data);
    return (
      <main className="wrapperL">
        <Helmet title="面試‧工作經驗" />
        {/*
          <Alert ref={c => { cmpAlert = c; }}>
            <p>test</p>
          </Alert>
        */}
        <div className={styles.container}>
          <aside>
            <button
              className={data.sort === 'created_at'
                ? `${styles.frontButton} ${styles.toggle}`
                : styles.frontButton}
              onClick={this.fetchExperiencesWithSort} value="created_at"
            >
              最新
            </button>
            <button
              className={data.sort === 'popularity'
                ? `${styles.rearButton} ${styles.toggle}`
                : styles.rearButton}
              onClick={this.fetchExperiencesWithSort} value="popularity"
            >
              熱門
            </button>

            <div className={styles.splitter} />

            {
              [
                { label: '面試經驗', value: 'interview' },
                { label: '工作經驗', value: 'work' },
                { label: '薪時資料', value: 'salary' },
              ].map(o => (
                <Checkbox
                  key={o.value} id={`searchType-${o.value}`}
                  label={o.label} value={o.value}
                  disabled={o.value === 'salary' && !data.searchQuery}
                  onChange={setSearchType} checked={data[o.value]}
                />
              ))
            }
            {/*
            <div className={styles.splitter} />

            {
              [
                { label: '全部', value: 'all' },
                { label: '金融業', value: 'finance' },
                { label: '製造業', value: 'manufacturing' },
                { label: '運輸業', value: 'transportation' },
                { label: '科技業', value: 'technology' },
              ].map(o => (
                <Radio
                  key={o.value} id={`industry-${o.value}`}
                  label={o.label} value={o.value}
                  onChange={setIndustry}
                  checked={data.industry === o.value}
                />
              ))
            }
            */}
          </aside>

          <div className={styles.content}>
            <div className={styles.searchbar}>
              <div className={styles.condition}>
                {
                  [
                    { label: '公司', value: 'company' },
                    { label: '職稱', value: 'job_title' },
                  ].map(o => (
                    <Radio
                      key={o.value} id={`condition-${o.value}`}
                      label={o.label} value={o.value} inline
                      onChange={fetchKeywords}
                      checked={data.searchBy === o.value}
                    />
                  ))
                }
              </div>
              <div className={styles.search}>
                <input
                  type="text"
                  onChange={setKeyword}
                  value={data.keyword}
                  placeholder={
                    data.searchBy === 'company'
                      ? '以公司搜尋'
                      : '以職稱搜尋'
                  }
                />
                <Search
                  onClick={() => {
                    // cmpAlert.show();
                    this.props.fetchExperiences('searchBy', data.keyword);
                    this.props.fetchWorkings(data.keyword);
                  }}
                />
                <div className={styles.keywordGroup}>
                  {
                    (data.keywords || []).map(o => (
                      <span
                        key={o} className={styles.keyword}
                        onClick={this.fetchDataWithSearchBy}
                      >
                        {o}
                      </span>
                    ))
                  }
                </div>
              </div>
            </div>
            {data.searchQuery &&
              <div className={styles.info}>
                找到 {data.experienceCount} 筆與 &quot;{data.searchQuery}&quot; 相關的資料
              </div>
            }
            <br />

            {
              (data.experiences || []).map(o => (
                data[o.type] && <ExperienceBlock key={o._id} data={o} />
              ))
            }

            {
              data.salary && (data.workings || []).map((o, i) => (
                <WorkingHourBlock key={o.company.id || i} data={o} />
              ))
            }
          </div>
        </div>
      </main>
    );
  }
}

export default ExperienceSearch;
