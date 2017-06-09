import { List } from 'immutable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/laborRightsSingle';
import LaborRightsSingle from '../components/LaborRightsSingle';

export default connect(
  (state, { params: { id } }) => {
    const data =
      state.laborRightsSingle.getIn(
        ['dataMapById', id, 'data']
      );
    const dataIsFetching =
      state.laborRightsSingle.getIn(
        ['dataMapById', id, 'dataIsFetching'],
        false
      );
    const dataError =
      state.laborRightsSingle.getIn(
        ['dataMapById', id, 'dataError']
      );
    const metaList = state.laborRightsSingle.get('metaList', List());
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
      isFetching: dataIsFetching,
      error: dataError,
    };
  },
  dispatch => bindActionCreators(actionCreators, dispatch),
)(LaborRightsSingle);
