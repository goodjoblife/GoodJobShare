import React from 'react';
import Helmet from 'react-helmet';

const HelmetComponent = props => {
  const {
    title,
    defaultTitle,
    titleTemplate,
    meta: metaList,
    link: linkList,
    children,
  } = props;
  return (
    <Helmet defaultTitle={defaultTitle} titleTemplate={titleTemplate}>
      {title ? (
        <title itemProp="name" lang="zh-TW">
          {title}
        </title>
      ) : null}
      {metaList.map((meta, index) => (
        <meta key={`meta_${index}`} {...meta} />
      ))}
      {linkList.map((link, index) => (
        <link key={`link_${index}`} {...link} />
      ))}
      {children}
    </Helmet>
  );
};

export default HelmetComponent;
