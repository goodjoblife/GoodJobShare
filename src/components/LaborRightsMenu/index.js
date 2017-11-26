import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import Columns from 'common/Columns';
import { Section, Wrapper, Heading } from 'common/base';
import {
  fetchMetaListIfNeeded,
} from '../../actions/laborRightsMenu';
import status from '../../constants/status';
import LaborRightsEntry from './LaborRightsEntry';
import About from './About';
import { PAGE_NAMES } from '../../constants/helmetConstants';
import { HelmetData } from '../../utils/helmetHelper';

class LaborRightsMenu extends React.Component {
  static fetchData({ store }) {
    return store.dispatch(fetchMetaListIfNeeded());
  }

  componentDidMount() {
    this.props.fetchMetaListIfNeeded();
  }

  render() {
    const title = '勞動知識小教室';
    return (
      <Section Tag="main" pageTop>
        <Wrapper size="l" Tag="main">
          <Helmet {...new HelmetData(PAGE_NAMES.LABOR_RIGHTS_MENU).getData()} />
          {this.props.status === status.FETCHING && <Loader />}
          {
            this.props.status === status.ERROR && this.props.error &&
              <Heading center size="m" Tag="div">{this.props.error.toString()}</Heading>
          }
          {
            this.props.status === status.FETCHED &&
              <section>
                <Heading size="l" center marginBottom>{title}</Heading>
                <Columns
                  Item={LaborRightsEntry}
                  items={this.props.metaList.toJS()}
                />
              </section>
          }
        </Wrapper>
        <Wrapper size="s">
          <About />
        </Wrapper>
      </Section>
    );
  }
}

LaborRightsMenu.propTypes = {
  metaList: ImmutablePropTypes.list.isRequired,
  fetchMetaListIfNeeded: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  error: ImmutablePropTypes.map,
};

export default LaborRightsMenu;
