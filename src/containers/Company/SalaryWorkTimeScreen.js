import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';
import fetchingStatus from '../../constants/status';
import SalaryWorkTimeScreen from '../../components/Company/SalaryWorkTimeScreen';
import withRouteParameter from '../../components/Company/withRouteParameter';
import { queryCompany } from '../../actions/timeAndSalaryCompany';

const mapStateToProps = (state, { companyName }) => {
  if (companyName !== state.timeAndSalaryCompany.get('companyName')) {
    return {
      data: null,
      status: fetchingStatus.UNFETCHED,
    };
  }
  return {
    data: state.timeAndSalaryCompany.get('data'),
    status: state.timeAndSalaryCompany.get('status'),
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ queryCompany }, dispatch);

export default R.compose(
  withRouteParameter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(SalaryWorkTimeScreen);
