import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import * as ExperienceSearchActions from '../../actions/experienceSearch';
import * as LaborRightsMenuActions from '../../actions/laborRightsMenu';

const mapStateToProps = state => ({
  experienceSearch: state.experienceSearch,
  laborRightsMetaList: state.laborRightsMenu.get('metaList'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...ExperienceSearchActions,
    ...LaborRightsMenuActions,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
