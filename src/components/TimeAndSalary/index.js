import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Switch } from 'react-router';
import Wrapper from 'common/base/Wrapper';
import { pathnameSelector } from 'common/routing/selectors';
import { formatTitle, formatCanonicalPath } from 'utils/helmetHelper';
import RouteWithSubRoutes from '../route';
import styles from './styles.module.css';
import { IMG_HOST, SITE_NAME } from 'constants/helmetData';

class TimeAndSalary extends Component {
  static propTypes = {
    routes: PropTypes.array,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    match: PropTypes.shape({
      params: PropTypes.shape({
        keyword: PropTypes.string,
      }),
    }),
    staticContext: PropTypes.object,
  };

  renderHelmet = () => {
    const pathname = pathnameSelector(this.props);
    const url = formatCanonicalPath(pathname);
    const title = '查看薪資、工時資訊';
    const description =
      '馬上查看薪資、工時資訊以及加班狀況，協助您找到更好的工作！';

    return (
      <Helmet>
        <title itemProp="name" lang="zh-TW">
          {title}
        </title>
        <meta name="description" content={description} />
        <meta property="og:title" content={formatTitle(title, SITE_NAME)} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${IMG_HOST}/og/time-and-salary.jpg`}
        />
        <meta property="og:url" content={url} />
        <link rel="canonical" href={url} />
      </Helmet>
    );
  };

  render() {
    const { routes } = this.props;

    return (
      <div className={styles.container}>
        {this.renderHelmet()}
        <Wrapper size="l" className={styles.subRouteWrapper}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route} />
            ))}
          </Switch>
        </Wrapper>
      </div>
    );
  }
}

export default TimeAndSalary;
