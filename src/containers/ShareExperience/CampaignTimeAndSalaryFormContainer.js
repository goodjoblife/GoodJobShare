import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignTimeAndSalaryForm from '../../components/ShareExperience/CampaignTimeAndSalaryForm';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';
import { createSalaryWorkTime } from '../../actions/timeAndSalary';

const mapStateToProps = state => ({
  campaignEntries: state.campaignInfo.get('entries'),
  campaignEntriesStatus: state.campaignInfo.get('entriesStatus'),
  campaignEntriesError: state.campaignInfo.get('entriesError'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryCampaignInfoListIfNeeded,
      createSalaryWorkTime,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CampaignTimeAndSalaryForm);
