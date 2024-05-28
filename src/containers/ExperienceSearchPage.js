import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceSearch from '../components/ExperienceSearch';
import * as ExperienceSearchActions from 'actions/experienceSearch';

import {
  experienceSearchSelector,
  loadingStatusSelector,
} from 'selectors/experienceSearchSelector';

const mapStateToProps = state => ({
  experienceSearch: experienceSearchSelector(state),
  loadingStatus: loadingStatusSelector(state),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExperienceSearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceSearch);
