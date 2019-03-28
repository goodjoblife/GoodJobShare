import React from 'react';
import Helmet from 'react-helmet';

const HelmetComponent = props => {
  const {
    title,
    meta: metaList,
    link: linkList,
    children,
    /*
      restProps could contain defaultTitle and titleTemplate
      之所以不直接 defaultTitle={defaultTitle} 是因為 undefined
      也會蓋掉之前的 helmet
    */
    ...restProps
  } = props;
  return (
    <Helmet {...restProps}>
      {title ? (
        <title itemProp="name" lang="zh-TW">
          {title}
        </title>
      ) : null}
      {metaList &&
        metaList.map((meta, index) => <meta key={`meta_${index}`} {...meta} />)}
      {linkList &&
        linkList.map((link, index) => <link key={`link_${index}`} {...link} />)}
      {children}
    </Helmet>
  );
};

export default HelmetComponent;
