import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';

import Checkbox from 'common/form/Checkbox';
import Loader from 'common/Loader';
import { Section, Wrapper } from 'common/base';
// import Alert from 'common/Alert';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import WorkingHourBlock from './WorkingHourBlock';
import { fetchExperiences } from '../../actions/experienceSearch';
import status from '../../constants/status';

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
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeywordClick = this.handleKeywordClick.bind(this);
    this.fetchExperiencesWithSort = this.fetchExperiencesWithSort.bind(this);
    this.fetchExperiencesAndWorkings = this.fetchExperiencesAndWorkings.bind(this);
  }

  componentDidMount() {
    this.props.fetchExperiences('sort', '');
    this.props.fetchKeywords('');
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      const val = e.target.value;
      this.fetchExperiencesAndWorkings(val);
    }
  }

  handleKeywordClick(e) {
    const val = e.target.innerHTML;
    this.fetchExperiencesAndWorkings(val);
  }

  fetchExperiencesAndWorkings(val) {
    console.log(val);
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
    // console.log('-->', experienceSearch, data);

    return (
      <Section Tag="main" pageTop>
        <Helmet title="面試 ‧ 工作經驗" />
        <Wrapper size="l">
          {/*
            <Alert ref={c => { cmpAlert = c; }}>
              <p>test</p>
            </Alert>
          */}
          <div className={styles.container}>
            <aside className={styles.aside}>
              <section>
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
              </section>
              <hr className={styles.splitter} />

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
              <Searchbar
                className={styles.searcbarLarge}
                data={data}
                fetchKeywords={fetchKeywords}
                setKeyword={setKeyword}
                handleKeyPress={this.handleKeyPress}
                handleKeywordClick={this.handleKeywordClick}
                fetchExperiencesAndWorkings={this.fetchExperiencesAndWorkings}
              />

              {data.loadingStatus === status.FETCHING && <Loader />}

              {data.searchQuery &&
                <div className={styles.searchResult}>
                  找到 {data.experienceCount} 筆與 &quot;{data.searchQuery}&quot; 相關的資料
                </div>
              }
              <br />

              {
                (data.experiences || []).map(o => (
                  data[o.type] && (
                    <ExperienceBlock key={o._id} data={o} size="l" />
                  )
                ))
              }

              {
                data.salary && (data.workings || []).map((o, i) => (
                  <WorkingHourBlock key={o.company.id || i} data={o} />
                ))
              }
            </div>
          </div>
        </Wrapper>
      </Section>
    );
  }
}

export default ExperienceSearch;
