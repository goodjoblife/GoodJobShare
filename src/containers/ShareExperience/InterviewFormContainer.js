import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import InterviewForm from '../../components/ShareExperience/InterviewForm';
import * as CounterActions from '../../actions/counter';


const mapStateToProps = state => ({
  counter: state.counter,
});


const mapDispatchToProps = dispatch =>
  bindActionCreators(CounterActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(InterviewForm);
