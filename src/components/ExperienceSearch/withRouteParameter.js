import { compose, withProps, withHandlers } from 'recompose';
import { withRouter } from 'react-router-dom';
import { pathnameSelector, querySelector } from 'common/routing/selectors';
import { queryParser, toQsString } from './helper';

export default compose(
  withRouter,
  withProps(({ location }) => {
    const { searchBy, searchQuery, sort, page, searchType } = queryParser(
      querySelector({ location }),
    );
    return {
      searchBy,
      searchQuery,
      sort,
      page,
      searchType,
    };
  }),
  withHandlers({
    changeRouteParameter: ({
      searchBy,
      searchQuery,
      sort,
      page,
      searchType,
      location,
      history,
    }) => updated => {
      const pathname = pathnameSelector({ location });
      const query = {
        searchBy,
        searchQuery,
        sort,
        page,
        searchType,
        ...updated,
      };
      const queryString = toQsString(query);
      const url = `${pathname}?${queryString}`;
      history.push(url);
    },
  }),
);
