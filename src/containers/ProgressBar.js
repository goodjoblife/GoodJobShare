import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ProgressBarWithDataCount } from '../components/common/ProgressBar';
import { queryTimeAndSalaryCount } from '../actions/dataCount';

const mapStateToProps = state => ({
  dataCount: state.dataCount.get('timeAndSalaryCount'),
  hasFetched: state.dataCount.get('hasFetchedTimeAndSalaryCount'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ dispatchGetDataCount: queryTimeAndSalaryCount }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarWithDataCount);
