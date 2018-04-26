import { connect } from 'react-redux';

import CampaignTimeAndSalaryForm from '../../components/ShareExperience/CampaignTimeAndSalaryForm';


const mapStateToProps = state => ({
  campaignEntries: state.campaignInfo.get('entries'),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CampaignTimeAndSalaryForm);
