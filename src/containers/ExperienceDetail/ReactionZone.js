import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import withFB from 'common/withFB';
import ReactionZone from '../../components/ExperienceDetail/ReactionZone';
import { login } from '../../actions/auth';

import {
  statusSelector,
} from '../../selectors/authSelector';

const mapStateToProps = state => ({
  authStatus: statusSelector(state),
});


const mapDispatchToProps = dispatch =>
  bindActionCreators({ login }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withFB(ReactionZone));
