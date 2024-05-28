import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { campaignTimeAndSalaryBoardSelector } from 'selectors/campaignTimeAndSalaryBoardSelector';
import CampaignTimeAndSalaryBoard from '../../components/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';

const mapStateToProps = state => {
  const campaignTimeAndSalaryBoard = campaignTimeAndSalaryBoardSelector(state);
  return {
    data: campaignTimeAndSalaryBoard.data,
    totalCount: campaignTimeAndSalaryBoard.total,
    currentPage: campaignTimeAndSalaryBoard.currentPage,
    status: campaignTimeAndSalaryBoard.status,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignTimeAndSalaryBoard);
