import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LandingPage from '../../components/LandingPage';
import * as LaborRightsMenuActions from '../../actions/laborRightsMenu';
import { queryPopularExperiences } from '../../actions/popularExperiences';

const mapStateToProps = state => ({
  popularExperiences: state.popularExperiences.get('data'),
  laborRightsMetaList: state.laborRightsMenu.get('metaList').slice(-3),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...LaborRightsMenuActions,
    queryPopularExperiences,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
