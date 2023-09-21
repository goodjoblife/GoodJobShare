import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { prop, compose } from 'ramda';
import { createStructuredSelector } from 'reselect';
import { campaignTimeAndSalaryBoardSelector } from 'selectors/campaignTimeAndSalaryBoardSelector';
import CampaignTimeAndSalaryBoard from '../../components/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';

const mapStateToProps = createStructuredSelector({
  data: compose(
    prop('data'),
    campaignTimeAndSalaryBoardSelector,
  ),
  totalCount: compose(
    prop('total'),
    campaignTimeAndSalaryBoardSelector,
  ),
  currentPage: compose(
    prop('currentPage'),
    campaignTimeAndSalaryBoardSelector,
  ),
  status: compose(
    prop('status'),
    campaignTimeAndSalaryBoardSelector,
  ),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignTimeAndSalaryBoard);
