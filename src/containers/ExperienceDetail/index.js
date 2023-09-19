import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceDetail);
