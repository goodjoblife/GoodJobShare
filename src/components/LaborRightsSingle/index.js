import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import Body from './Body';
import Footer from './Footer';
import CallToAction from './CallToAction';

import {
    fetchMetaListIfNeeded,
    fetchDataIfNeeded,
} from '../../actions/laborRightsSingle';
import status from '../../constants/status';

class LaborRightsSingle extends React.Component {
  static fetchData({ store: { dispatch }, params: { id } }) {
    return dispatch(fetchMetaListIfNeeded()).then(() =>
      dispatch(fetchDataIfNeeded(id))
    );
  }

  componentDidMount() {
    this.props.fetchMetaListIfNeeded().then(() => {
      this.props.fetchDataIfNeeded(this.props.params.id);
    });
  }

  componentDidUpdate() {
    this.props.fetchMetaListIfNeeded().then(() => {
      this.props.fetchDataIfNeeded(this.props.params.id);
    });
  }

  render() {
    const {
      title,
      description,
      content,
      coverUrl,
    } = this.props.data ? this.props.data.toJS() : {};
    const {
      seoTitle = title || '',
      seoDescription,
      seoText,
    } = this.props.data ? this.props.data.toJS() : {};
    return (
      <main>
        <Helmet
          title={`${seoTitle} | 工時薪資透明化運動`}
          meta={[
            { name: 'description', content: seoDescription },
            { property: 'og:image', content: coverUrl },
          ]}
        />
        {this.props.status === status.FETCHING && <Loader />}
        {
          this.props.status === status.ERROR &&
            <div>{this.props.error.toString()}</div>
        }
        {
          this.props.status === status.FETCHED &&
            <div>
              <Body
                title={title}
                seoText={seoText}
                description={description}
                content={content}
              />
              <Footer
                prev={this.props.prev}
                next={this.props.next}
              />
              <CallToAction />
            </div>
        }
      </main>
    );
  }
}

LaborRightsSingle.propTypes = {
  params: React.PropTypes.object.isRequired,
  data: ImmutablePropTypes.map,
  prev: ImmutablePropTypes.map,
  next: ImmutablePropTypes.map,
  fetchMetaListIfNeeded: React.PropTypes.func.isRequired,
  fetchDataIfNeeded: React.PropTypes.func.isRequired,
  status: React.PropTypes.string.isRequired,
  error: React.PropTypes.instanceOf(Error),
};

export default LaborRightsSingle;
