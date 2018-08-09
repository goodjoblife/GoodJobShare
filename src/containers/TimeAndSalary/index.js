import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TimeAndSalary from '../../components/TimeAndSalary';
import { queryCampaignInfoListIfNeeded } from '../../actions/campaignInfo';

const mapStateToProps = state => ({
  campaignEntries: state.campaignInfo.get('entries'),
  campaignEntriesStatus: state.campaignInfo.get('entriesStatus'),
  campaignEntriesError: state.campaignInfo.get('entriesError'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      queryCampaignInfoListIfNeeded,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeAndSalary);
