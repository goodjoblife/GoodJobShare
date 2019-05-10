import React from 'react';
import Helmet from 'react-helmet';
import { FACEBOOK_APP_ID } from '../../../config';
import { SITE_NAME, IMG_HOST } from '../../../constants/helmetData';
import { formatTitle, formatCanonicalPath } from '../../../utils/helmetHelper';
/*
  This file will organize most of STATIC meta data information.
  For those DYNAMIC meta data information, will be generated in each component
*/

/*
The followings are some useful html head elements:
  <title>
  <meta name='description' content='Free Web tutorials'>
  <meta name='keywords' content='HTML, CSS, XML, JavaScript'>
  <meta name='author' content='John Doe'>
* reference: https://www.w3schools.com/html/html_head.asp

The followings are some useful elements from Open Graph Protocol:
  og:title - The title of your object as it should appear within the graph, e.g., 'The Rock'.
  og:type - The type of your object, e.g., 'video.movie'. Depending on the type you specify, other properties may also be required.
  og:image - An image URL which should represent your object within the graph.
  og:url - The canonical URL of your object that will be used as its permanent ID in the graph, e.g., 'http://www.imdb.com/title/tt0117500/'.
  og:description - A one to two sentence description of your object.
  og:locale - The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.
  og:site_name - If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., 'IMDb'.
* reference: http://ogp.me/

*/

export default {
  Default: () => (
    <Helmet defaultTitle={SITE_NAME} titleTemplate={`%s | ${SITE_NAME}`}>
      <meta
        name="description"
        content="匿名分享你的面試經驗，一起建立台灣最大面試資料庫！"
      />
      <meta
        name="keywords"
        content="工作時間, 加班狀況, 薪資福利, 面試經驗, 工作心得, 實習經驗, 工作評論, 職場資訊透明化"
      />
      <meta property="og:title" content={SITE_NAME} />
      <meta property="og:url" content={formatCanonicalPath('/')} />
      <meta property="og:type" content="website" />
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/default-06-April.jpg`}
      />
      <meta
        property="og:description"
        content="匿名分享你的面試經驗，一起建立台灣最大面試資料庫！"
      />
      <meta property="og:locale" content="zh_TW" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="fb:app_id" content={FACEBOOK_APP_ID} />
      <link rel="canonical" href={formatCanonicalPath('/')} />
    </Helmet>
  ),
  LandingPage: () => (
    <Helmet>
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/default-06-April.jpg`}
      />
    </Helmet>
  ),
  Share: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        分享你的職場資訊
      </title>
      <meta
        property="og:title"
        content={formatTitle('分享你的職場資訊', SITE_NAME)}
      />
      <meta property="og:url" content={formatCanonicalPath('/share')} />
      <meta property="og:image" content={`${IMG_HOST}/og/share-work.jpg`} />
      <link rel="canonical" href={formatCanonicalPath('/share')} />
    </Helmet>
  ),
  ShareInterview: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        面試經驗分享
      </title>
      <meta
        property="og:title"
        content={formatTitle('面試經驗分享', SITE_NAME)}
      />
      <meta
        property="og:url"
        content={formatCanonicalPath('/share/interview')}
      />
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/share-interview.jpg`}
      />
      <link rel="canonical" href={formatCanonicalPath('/share/interview')} />
    </Helmet>
  ),
  ShareSalaryWorkTime: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        薪資工時分享
      </title>
      <meta
        property="og:title"
        content={formatTitle('薪資工時分享', SITE_NAME)}
      />
      <meta
        property="og:url"
        content={formatCanonicalPath('/share/time-and-salary')}
      />
      <meta
        property="og:image"
        content={`${IMG_HOST}/og/share-time-and-salary.jpg`}
      />
      <link
        rel="canonical"
        href={formatCanonicalPath('/share/time-and-salary')}
      />
      ],
    </Helmet>
  ),
  ShareWork: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        工作經驗分享
      </title>
      <meta
        property="og:title"
        content={formatTitle('工作經驗分享', SITE_NAME)}
      />
      <meta
        property="og:url"
        content={formatCanonicalPath('/share/work-experiences')}
      />
      <meta property="og:image" content={`${IMG_HOST}/og/share-work.jpg`} />
      <link
        rel="canonical"
        href={formatCanonicalPath('/share/work-experiences')}
      />
    </Helmet>
  ),
  LaborRightsMenu: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        勞動知識小教室
      </title>
      <meta
        name="description"
        content="我們看見勞工們的需要，推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，內容涵蓋勞動基準法、性別工作平等法、就業服務法以及工會相關法令等勞工必備的權益資訊。讓勞工認識自己的權益，學會保護自己。"
      />
      <meta
        property="og:title"
        content={formatTitle('勞動知識小教室', SITE_NAME)}
      />
      <meta property="og:url" content={formatCanonicalPath('/labor-rights')} />
      <meta property="og:image" content={`${IMG_HOST}/og/labor-rights.jpg`} />
      <meta
        property="og:description"
        content="我們看見勞工們的需要，推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，內容涵蓋勞動基準法、性別工作平等法、就業服務法以及工會相關法令等勞工必備的權益資訊。讓勞工認識自己的權益，學會保護自己。"
      />
      <link rel="canonical" href={formatCanonicalPath('/labor-rights')} />
    </Helmet>
  ),
  About: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        關於我們
      </title>
      <meta
        name="description"
        content="在過去求職的經驗中，我們發現台灣的求職資訊相當不透明。 薪資、工時的資訊經常不得而知，而實際工作內容也與當初求職網站說明的有所出入。 因此，我們決定採取行動，嘗試解決求職市場資訊不透明的問題，讓我們在找工作時，能夠做出更好的選擇。"
      />
      <meta property="og:title" content={formatTitle('關於我們', SITE_NAME)} />
      <meta property="og:url" content={formatCanonicalPath('/about')} />
      <meta property="og:image" content={`${IMG_HOST}/og/about.jpg`} />
      <meta
        property="og:description"
        content="在過去求職的經驗中，我們發現台灣的求職資訊相當不透明。 薪資、工時的資訊經常不得而知，而實際工作內容也與當初求職網站說明的有所出入。 因此，我們決定採取行動，嘗試解決求職市場資訊不透明的問題，讓我們在找工作時，能夠做出更好的選擇。"
      />
      <link rel="canonical" href={formatCanonicalPath('/about')} />
    </Helmet>
  ),
  PrivacyPolicy: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        隱私權政策
      </title>
      <meta name="description" content="" />
      <meta
        property="og:title"
        content={formatTitle('隱私權政策', SITE_NAME)}
      />
      <meta
        property="og:url"
        content={formatCanonicalPath('/privacy-policy')}
      />
      <link rel="canonical" href={formatCanonicalPath('/privacy-policy')} />
    </Helmet>
  ),
  UserTerms: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        使用者條款
      </title>
      <meta name="description" content="" />
      <meta
        property="og:title"
        content={formatTitle('使用者條款', SITE_NAME)}
      />
      <meta property="og:url" content={formatCanonicalPath('/user-terms')} />
      <link rel="canonical" href={formatCanonicalPath('/user-terms')} />
    </Helmet>
  ),
  Faq: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        常見問答
      </title>
      <meta name="description" content="" />
      <meta property="og:title" content={formatTitle('常見問答', SITE_NAME)} />
      <meta property="og:url" content={formatCanonicalPath('/faq')} />
      <meta property="og:image" content={`${IMG_HOST}/og/faq.jpg`} />
      <link rel="canonical" href={formatCanonicalPath('/faq')} />
    </Helmet>
  ),
  Guidelines: () => (
    <Helmet>
      <title itemProp="name" lang="zh-TW">
        發文留言規則
      </title>
      <meta name="description" content="" />
      <meta
        property="og:title"
        content={formatTitle('發文留言規則', SITE_NAME)}
      />
      <meta property="og:url" content={formatCanonicalPath('/guidelines')} />
      <link rel="canonical" href={formatCanonicalPath('/guidelines')} />
    </Helmet>
  ),
};
