import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { withFB } from 'common/facebook';
import { setUser } from '../../../actions/auth';
// import authStatus from '../../../constants/authStatus';

// const { CONNECTED } = authStatus;

// const getLoginStatus = async ({ FB, setAuthForFB }) => {
//   if (!FB) {
//     return;
//   }
//   const response = await new Promise(resolve =>
//     FB.getLoginStatus(response => resolve(response)),
//   );

//   const status = response.status;
//   if (status === CONNECTED) {
//     await setAuthForFB(status, response.authResponse.accessToken);
//   } else {
//     await setAuthForFB(status);
//   }
//   return status;
// };

// const getMe = async ({ FB, setUser }) => {
//   if (!FB) {
//     return;
//   }
//   const response = await new Promise(resolve =>
//     FB.api('/me', response => resolve(response)),
//   );
//   const { id, name } = response;
//   const user = { id, name };
//   await setUser(user);
//   return user;
// };

const mapStateToProps = state => ({
  authStatus: state.auth.get('status'),
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setUser }, dispatch);

const hoc = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withFB,
  lifecycle({
    componentDidMount() {
      // const { FB, setAuthForFB } = this.props;
      // getLoginStatus({ FB, setAuthForFB });
    },
    componentDidUpdate(prevProps) {
      // if (prevProps.FB !== this.props.FB) {
      //   const { FB, setAuthForFB } = this.props;
      //   getLoginStatus({ FB, setAuthForFB });
      // }
      // if (
      //   prevProps.authStatus !== this.props.authStatus &&
      //   this.props.authStatus === CONNECTED
      // ) {
      //   const { FB, setUser } = this.props;
      //   getMe({ FB, setUser });
      // }
    },
  }),
);

export default hoc(() => null);
