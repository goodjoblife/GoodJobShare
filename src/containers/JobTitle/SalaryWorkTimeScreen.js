import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import fetchingStatus from '../../constants/status';
import SalaryWorkTimeScreen from '../../components/JobTitle/SalaryWorkTimeScreen';
import withRouteParameter from '../../components/JobTitle/withRouteParameter';
import { queryJobTitle } from '../../actions/timeAndSalaryJobTitle';

const mapStateToProps = (state, { jobTitle }) => {
  if (jobTitle !== state.timeAndSalaryJobTitle.get('jobTitle')) {
    return {
      data: null,
      status: fetchingStatus.UNFETCHED,
    };
  }
  return {
    data: state.timeAndSalaryJobTitle.get('data'),
    status: state.timeAndSalaryJobTitle.get('status'),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryJobTitle }, dispatch);

export default R.compose(
  withRouteParameter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SalaryWorkTimeScreen);
