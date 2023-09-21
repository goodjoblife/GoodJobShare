import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import ExperienceSearch from '../components/ExperienceSearch';
import * as ExperienceSearchActions from 'actions/experienceSearch';

import {
  experienceSearchSelector,
  loadingStatusSelector,
} from 'selectors/experienceSearchSelector';

const mapStateToProps = createStructuredSelector({
  experienceSearch: experienceSearchSelector,
  loadingStatus: loadingStatusSelector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(ExperienceSearchActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceSearch);
