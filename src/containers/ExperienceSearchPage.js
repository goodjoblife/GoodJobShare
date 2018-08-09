import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ExperienceSearch from '../components/ExperienceSearch';
import * as ExperienceSearchActions from '../actions/experienceSearch';

import { loadingStatusSelector } from '../selectors/experienceSearchSelector';

const mapStateToProps = createStructuredSelector({
  experienceSearch: state => state.experienceSearch,
  loadingStatus: loadingStatusSelector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExperienceSearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperienceSearch);
