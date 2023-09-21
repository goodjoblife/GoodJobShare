import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CampaignTimeAndSalaryForm from '../../components/ShareExperience/CampaignTimeAndSalaryForm';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';
import { createSalaryWorkTime } from '../../actions/timeAndSalary';
import {
  campaignEntriesSelector,
  campaignEntriesStatusSelector,
  campaignEntriesErrorSelector,
} from 'selectors/campaignSelector';

const mapStateToProps = state => ({
  campaignEntries: campaignEntriesSelector(state),
  campaignEntriesStatus: campaignEntriesStatusSelector(state),
  campaignEntriesError: campaignEntriesErrorSelector(state),
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
