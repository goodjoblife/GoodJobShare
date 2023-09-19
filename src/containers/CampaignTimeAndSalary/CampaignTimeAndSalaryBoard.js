import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignTimeAndSalaryBoard from '../../components/CampaignTimeAndSalary/CampaignTimeAndSalaryBoard';

const mapStateToProps = (state, { match }) => ({
  data: state.campaignTimeAndSalaryBoard.get('data'),
  totalCount: state.campaignTimeAndSalaryBoard.get('total'),
  currentPage: state.campaignTimeAndSalaryBoard.get('currentPage'),
  status: state.campaignTimeAndSalaryBoard.get('status'),
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignTimeAndSalaryBoard);
