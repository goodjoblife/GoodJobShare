import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRightsSingle';
import status from '../constants/status';
import LaborRightsSingle from '../components/LaborRightsSingle';

export default connect(
  (state, { params: { id } }) => {
    const data =
      state.laborRightsSingle.getIn(
        ['dataMapById', id, 'data']
      );
    const dataStatus =
      state.laborRightsSingle.getIn(
        ['dataMapById', id, 'dataStatus'],
        status.UNFETCHED
       );
    const dataError =
      state.laborRightsSingle.getIn(
        ['dataMapById', id, 'dataError']
      );
    const metaList = state.laborRightsSingle.get('metaList');
    const ids = metaList.map(meta => meta.get('id'));
    const index = ids.indexOf(id);
    const prevData =
      metaList.get(index > 0 ? index - 1 : undefined);
    const nextData =
      metaList.get(index < ids.count() - 1 ? index + 1 : undefined);
    return {
      data,
      prev: prevData,
      next: nextData,
      status: dataStatus,
      error: dataError,
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
