import { connect } from 'react-redux';

import Lecture from '../components/LaborLecture';

const mapStateToProps = (state, { params: { id } }) => ({
  lecture_id: id,
});

export default connect(mapStateToProps)(Lecture);
