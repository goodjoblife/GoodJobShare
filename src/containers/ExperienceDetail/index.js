import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';
<<<<<<< HEAD
import { fetchExperience } from 'actions/experienceDetail';

const mapStateToProps = state => ({
  experienceDetail: state.experienceDetail,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchExperience,
    },
    dispatch,
  );
=======

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);
>>>>>>> upstream/master

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceDetail);
