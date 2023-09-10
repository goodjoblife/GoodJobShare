import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';
import * as ExperienceDetailActions from 'actions/experienceDetail';

const mapStateToProps = state => ({
  experienceDetail: state.experienceDetail,
  replies: state.experienceDetail.get('replies'),
  repliesStatus: state.experienceDetail.get('replyStatus'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...ExperienceDetailActions,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceDetail);
