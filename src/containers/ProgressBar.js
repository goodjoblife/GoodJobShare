import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { isFetched } from '../constants/status';

import { ProgressBarWithDataCount } from '../components/common/ProgressBar';
import { queryTimeAndSalaryCount } from '../actions/timeAndSalary';

const mapStateToProps = state => ({
  dataNum: state.timeAndSalary.get('count'),
  hasFetched: isFetched(state.timeAndSalary.get('countStatus')),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchGetDataCount: queryTimeAndSalaryCount }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarWithDataCount);
