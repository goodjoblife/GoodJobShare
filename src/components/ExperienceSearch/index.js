import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Helmet from 'react-helmet';
import InfiniteScroll from 'react-infinite-scroller';

import Checkbox from 'common/form/Checkbox';
import Loader from 'common/Loader';
import { Section, Wrapper } from 'common/base';

import styles from './ExperienceSearch.module.css';
import Searchbar from './Searchbar';
import ExperienceBlock from './ExperienceBlock';
import WorkingHourBlock from './WorkingHourBlock';
import { fetchExperiences } from '../../actions/experienceSearch';
import helmetData from '../../constants/helmetData';

class ExperienceSearch extends Component {
  static fetchData({ store: { dispatch } }) {
    return dispatch(fetchExperiences('sort', '', 0));
  }

  static propTypes = {
    setSearchType: PropTypes.func.isRequired,
    setKeyword: PropTypes.func.isRequired,
    fetchExperiences: PropTypes.func.isRequired,
    fetchMoreExperiences: PropTypes.func.isRequired,
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
    this.props.fetchExperiences('sort', '', 0);
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
    this.props.fetchExperiences('searchBy', val, 0);
    this.props.fetchWorkings(val);
  }

  fetchExperiencesWithSort(e) {
    this.props.fetchExperiences('sort', e.target.value, 0);
  }

  render() {
    const {
      /* setSort, */ setSearchType, /* setIndustry, */ fetchKeywords, setKeyword,
      fetchMoreExperiences,
      experienceSearch,
    } = this.props;
    const data = experienceSearch.toJS();

    return (
      <Section Tag="main" pageTop paddingBottom>
        <Helmet {...helmetData.EXPERIENCE_SEARCH} />
        <Wrapper size="l">
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

              {data.searchQuery &&
                <div className={styles.searchResult}>
                  找到 {data.experienceCount} 筆與 &quot;{data.searchQuery}&quot; 相關的資料
                </div>
              }
              <br />

              <InfiniteScroll
                pageStart={0} hasMore={data.hasMore}
                loadMore={nextPage => {
                  if (data.hasMore) {
                    fetchMoreExperiences(nextPage);
                  }
                }}
                loader={<Loader />}
              >
                {
                  (data.experiences || []).map(o => (
                    data[o.type] && (
                      <ExperienceBlock
                        key={o._id} to={`/experiences/${o._id}`}
                        data={o} size="l"
                      />
                    )
                  ))
                }
              </InfiniteScroll>

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
