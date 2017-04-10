import { connect } from 'react-redux';

import LaborRights from '../components/LaborRights';

const mapStateToProps = (state, { params: { id } }) => ({
  lecture_id: id,
});

export default connect(mapStateToProps)(LaborRights);
