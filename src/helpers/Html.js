import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

import { GTM_ID, GOOGLE_AD_CLIENT_ID, AMPLITUDE_API_KEY } from '../config';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object,
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();

    return (
      <html lang="zh-TW">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="UTF-8" />
          {assets.client.css && (
            <link rel="stylesheet" href={assets.client.css} />
          )}
          {/* include Sentry library for reporting website error --> */}
          <script
            src="https://cdn.ravenjs.com/3.26.4/raven.min.js"
            crossOrigin="anonymous"
          />
          {/* install google tag manager */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          {/* install amplitude */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `(function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
              ;r.type="text/javascript";r.async=true
              ;r.src="https://cdn.amplitude.com/libs/amplitude-4.5.2-min.gz.js"
              ;r.onload=function(){if(e.amplitude.runQueuedFunctions){
              e.amplitude.runQueuedFunctions()}else{
              console.log("[Amplitude] Error: could not load SDK")}}
              ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
              ;function s(e,t){e.prototype[t]=function(){
              this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
              var o=function(){this._q=[];return this}
              ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
              ;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
              ;return this}
              ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
              ;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
              ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut",
              "setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify",
              "clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp",
              "logEventWithGroups","setSessionId","resetSessionId"]
              ;function v(e){function t(t){e[t]=function(){
              e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
              for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
              e=(!e||e.length===0?"$default_instance":e).toLowerCase()
              ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
              ;e.amplitude=n})(window,document);

              amplitude.getInstance().init("${AMPLITUDE_API_KEY}", null, {
                // optional configuration options
                includeGclid: true,
                includeReferrer: true,
                includeUtm: true,
                unsetParamsReferrerOnNewSession: true,
              });`,
            }}
          />
          <script
            data-ad-client={GOOGLE_AD_CLIENT_ID}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
        </head>
        <body>
          {/* install google tag manager */}
          <noscript>
            {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <div
            id="root"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `window.__data=${serialize(store.getState())};`,
            }}
            charSet="UTF-8"
          />
          <script src={assets.client.js} charSet="UTF-8" />
        </body>
      </html>
    );
  }
}
