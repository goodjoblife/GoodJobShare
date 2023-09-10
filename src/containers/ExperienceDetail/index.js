import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceDetail);
