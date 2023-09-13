import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExperienceDetail from '../../components/ExperienceDetail';
import { fetchReplies, likeReply } from 'actions/experienceDetail';

const mapStateToProps = state => ({
  replies: state.experienceDetail.get('replies'),
  repliesStatus: state.experienceDetail.get('replyStatus'),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchReplies,
      likeReply,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExperienceDetail);
