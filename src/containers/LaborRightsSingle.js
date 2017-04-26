import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/LaborRightsSingle';
import status from '../constants/status';
import LaborRightsSingle from '../components/LaborRightsSingle';

export default connect(
  (state, { params: { id: laborRightsId } }) => {
    const data =
      state.SingleLaborRights.getIn(
        ['dataMapById', laborRightsId, 'data']
      );
    const dataStatus =
      state.SingleLaborRights.getIn(
        ['dataMapById', laborRightsId, 'dataStatus'],
        status.UNFETCHED
       );
    const dataError =
      state.SingleLaborRights.getIn(
        ['dataMapById', laborRightsId, 'dataError']
      );
    const metaList = state.SingleLaborRights.get('metaList');
    const ids = metaList.map(({ id }) => id);
    const index = ids.indexOf(laborRightsId);
    const prevId = index > 0 ? ids.get(index - 1) : undefined;
    const nextId = index < ids.count() - 1 ? ids.get(index + 1) : undefined;
    const prev = metaList.get(prevId);
    const next = metaList.get(nextId);
    return {
      data,
      prev,
      next,
      status: dataStatus,
      error: dataError,
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
