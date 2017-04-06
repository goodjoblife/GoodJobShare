import { connect } from 'react-redux';

import Lecture from '../components/LaborLecture';

const mapStateToProps = (state, { params: { lecture_id } }) => ({
  lecture_id,
});

export default connect(mapStateToProps)(Lecture);
