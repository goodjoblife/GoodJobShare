import { connect } from 'react-redux';
import CampaignTimeAndSalary from '../../components/CampaignTimeAndSalary';

const mapStateToProps = state => ({
  campaignEntries: state.campaignInfo.get('entries'),
  campaignEntriesStatus: state.campaignInfo.get('entriesStatus'),
  campaignEntriesError: state.campaignInfo.get('entriesError'),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTimeAndSalary);
