import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createWorkExperience } from 'actions/experiences';
import WorkExperiencesForm from '../../components/ShareExperience/WorkExperiencesForm';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createWorkExperience }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WorkExperiencesForm);
