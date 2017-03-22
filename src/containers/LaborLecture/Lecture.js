import { connect } from 'react-redux'

import Lecture from '../../components/LaborLecture/Lecture'

const mapStateToProps = (state, { params: { lecture } }) => ({
    lecture,
});

export default connect(mapStateToProps)(Lecture);
