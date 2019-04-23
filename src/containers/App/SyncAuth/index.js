import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { statusSelector, tokenSelector } from '../../../selectors/authSelector';
import { loginWithToken } from '../../../actions/auth';
import authStatus from '../../../constants/authStatus';

const { CONNECTED } = authStatus;

const mapStateToProps = state => ({
  authStatus: statusSelector(state),
  token: tokenSelector(state),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ loginWithToken }, dispatch);

const hoc = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { authStatus, loginWithToken, token } = this.props;
      if (authStatus === CONNECTED) {
        loginWithToken(token);
      }
    },
    componentDidUpdate(prevProps) {
      if (
        prevProps.authStatus !== this.props.authStatus &&
        this.props.authStatus === CONNECTED
      ) {
        const { loginWithToken, token } = this.props;
        loginWithToken(token);
      }
    },
  }),
);

export default hoc(() => null);
