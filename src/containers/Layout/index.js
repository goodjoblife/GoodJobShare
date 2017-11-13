import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../../components/Layout';

import * as ExperienceSearchActions from '../../actions/experienceSearch';

const mapStateToProps = state => ({
  experienceCount: state.experienceSearch.get('experienceCount'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...ExperienceSearchActions,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
