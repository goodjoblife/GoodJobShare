import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRights';
import LaborRightsSingle from '../components/LaborRightsSingle';

export default connect(
  (state, { params: { id } }) => {
    const title = state.laborRights.getIn(['dataMapById', id, 'title']);
    const content = state.laborRights.getIn(['dataMapById', id, 'content']);
    const ids = state.laborRights.get('idList');
    const index = ids.indexOf(id);
    const prevId = index > 0 ? ids.get(index - 1) : undefined;
    const nextId = index < ids.count() - 1 ? ids.get(index + 1) : undefined;
    const prev = state.laborRights.getIn(['dataMapById', prevId]);
    const next = state.laborRights.getIn(['dataMapById', nextId]);
    return {
      title,
      content,
      prev,
      next,
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
