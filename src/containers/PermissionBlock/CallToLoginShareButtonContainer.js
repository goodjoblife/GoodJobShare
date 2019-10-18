import { connect } from 'react-redux';
import { compose } from 'recompose';

import CallToLoginShareButton from 'common/PermissionBlock/CallToLoginShareButton';
import withModal from '../../components/TimeAndSalary/common/withModal';

const mapStateToProps = state => ({
  auth: state.auth,
});

const hoc = compose(withModal('loginModal'));

export default connect(mapStateToProps)(hoc(CallToLoginShareButton));
