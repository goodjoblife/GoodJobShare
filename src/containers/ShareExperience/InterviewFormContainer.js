import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createInterviewExperience } from '../../actions/experiences';
import InterviewForm from '../../components/ShareExperience/InterviewForm';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ createInterviewExperience }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InterviewForm);
