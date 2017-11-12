import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ExperienceSearch from '../components/ExperienceSearch';
import * as ExperienceSearchActions from '../actions/experienceSearch';

import {
  searchBySelector,
  sortSelector,
  searchQuerySelector,
} from '../selectors/experienceSearchSelector';

const mapStateToProps = createStructuredSelector({
  experienceSearch: state => state.experienceSearch,
  searchBy: searchBySelector,
  searchQuery: searchQuerySelector,
  sort: sortSelector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExperienceSearchActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ExperienceSearch);
