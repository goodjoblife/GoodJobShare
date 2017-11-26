import React from 'react';
import Helmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Loader from 'common/Loader';
import {
  formatTitle,
  formatCanonicalPath,
  formatUrl,
  HelmetData,
} from 'utils/helmetHelper';
import NotFound from 'common/NotFound';
import CallToAction from 'common/CallToAction';
import Body from './Body';
import Footer from './Footer';

import {
    fetchMetaListIfNeeded,
    fetchDataIfNeeded,
} from '../../actions/laborRightsSingle';
import status from '../../constants/status';
import { PAGE_NAMES, SITE_NAME } from '../../constants/helmetConstants';

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
      id,
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
          {...new HelmetData(PAGE_NAMES.LABOR_RIGHTS_SINGLE).setData({
            title: seoTitle,
            description: seoDescription,
            'og:url': formatCanonicalPath(`/labor-rights/${id}`),
            'og:title': formatTitle(seoTitle, SITE_NAME),
            'og:description': seoDescription,
            'og:image': formatUrl(coverUrl),
            link: formatCanonicalPath(`/labor-rights/${id}`),
          }).getData()}
        />
        {this.props.status === status.FETCHING && <Loader />}
        {
          this.props.status === status.ERROR && this.props.error.get('message') === 'Not found' &&
            <NotFound />
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
              <CallToAction
                imgSrc="https://image.goodjob.life/cta-02.jpg"
                marginTop
              />
              <Footer
                id={id}
                prev={this.props.prev}
                next={this.props.next}
              />
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
  error: ImmutablePropTypes.map,
};

export default LaborRightsSingle;
