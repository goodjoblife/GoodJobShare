

import { formatCanonicalPath } from '../utils/helmetHelper';
/*
  This file will organize most of CONSTANT head information.
  For those DYNAMIC head information, will be generated in each component
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

const siteName = 'goodjob 透明資訊求職平台';
const imgHost = 'https://s3-ap-northeast-1.amazonaws.com/goodjob.life';
const helmetData = {
  DEFAULT: {
    title: siteName,
    titleTemplate: `%s | ${siteName}`,
    meta: [
      { name: 'description', content: '分享你的工時、薪資、面試經驗以及工作經驗，讓我們一起改善求職市場不透明的問題。' },
      { name: 'keywords', content: '工作時間, 薪資, 面試經驗, 工作經驗, 工作評論' },
      { property: 'og:title', content: siteName },
      { property: 'og:url', content: formatCanonicalPath('/') },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${imgHost}/www/og/default.jpg` },
      { property: 'og:description', content: '分享你的工時、薪資、面試經驗以及工作經驗，讓我們一起改善求職市場不透明的問題。' },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:site_name', content: siteName },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/') },
    ],
  },
  LANDING_PAGE: {
    title: '首頁',
    meta: [
    ],
  },
  SHARE: {
    title: '分享資訊',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '' },
      { property: 'og:url', content: formatCanonicalPath('/share') },
      { property: 'og:image', content: `${imgHost}/www/og/share.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share') },
    ],
  },
  SHARE_INTERVIEW: {
    title: '面試經驗分享',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '面試經驗分享' },
      { property: 'og:url', content: formatCanonicalPath('/share/interview') },
      { property: 'og:image', content: `${imgHost}/www/og/share-interview.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share/interview') },
    ],
  },
  SHARE_WORK: {
    title: '工作經驗分享',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '工作經驗分享' },
      { property: 'og:url', content: formatCanonicalPath('/share/work-experience') },
      { property: 'og:image', content: `${imgHost}/www/og/share-work.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share/work-experience') },
    ],
  },
  EXPERIENCE_SEARCH: {
    title: '搜尋面試及工作經驗',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '搜尋面試及工作經驗' },
      { property: 'og:url', content: formatCanonicalPath('/experiences/search') },
      { property: 'og:image', content: `${imgHost}/www/og/experience-search.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/experiences/search') },
    ],
  },
  EXPERIENCE_DETAIL: {
    // information is dynamic
  },
  LABOR_RIGHTS_MENU: {
    title: '勞動知識小教室',
    meta: [
      { name: 'description', content: `${siteName}，看見勞工們的需要，自 2016 年底推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，讓勞工認識自己的權益，學會保護自己。內容涵蓋勞基法、性別工作平等法、就服法以及工會相關法令等勞工必備的權益資訊。` },
      { property: 'og:title', content: '勞動知識小教室' },
      { property: 'og:url', content: formatCanonicalPath('/labor-rights') },
      { property: 'og:image', content: `${imgHost}/www/og/labor-rights.jpg` },
      { property: 'og:description', content: `${siteName}，看見勞工們的需要，自 2016 年底推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，讓勞工認識自己的權益，學會保護自己。內容涵蓋勞基法、性別工作平等法、就服法以及工會相關法令等勞工必備的權益資訊。` },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/labor-rights') },
    ],
  },
  LABOR_RIGHTS_SINGLE: {
    // information is dynamic
  },
  CONTACT: {
    title: '聯絡我們',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '聯絡我們' },
      { property: 'og:url', content: formatCanonicalPath('/contact') },
      { property: 'og:image', content: `${imgHost}/www/og/contact.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/contact') },
    ],
  },
  ABOUT: {
    title: '關於我們',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '關於我們' },
      { property: 'og:url', content: formatCanonicalPath('/about') },
      { property: 'og:image', content: `${imgHost}/www/og/about.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/about') },
    ],
  },
  PRIVACY_POLICY: {
    title: '隱私權政策',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '隱私權政策' },
      { property: 'og:url', content: formatCanonicalPath('/privacy-policy') },
      { property: 'og:image', content: `${imgHost}/www/og/privacy-policy.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/privacy-policy') },
    ],
  },
  USER_TERMS: {
    title: '使用者條款',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '使用者條款' },
      { property: 'og:url', content: formatCanonicalPath('/user-term') },
      { property: 'og:image', content: `${imgHost}/www/og/user-term.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/user-term') },
    ],
  },
  FAQ: {
    title: '常見問答',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '常見問答' },
      { property: 'og:url', content: formatCanonicalPath('/faq') },
      { property: 'og:image', content: `${imgHost}/www/og/faq.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/faq') },
    ],
  },
  RECRUIT: {
    title: '加入我們',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: '加入我們' },
      { property: 'og:url', content: formatCanonicalPath('/recruit') },
      { property: 'og:image', content: `${imgHost}/www/og/recruit.jpg` },
      { property: 'og:description', content: '' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/recruit') },
    ],
  },
};

export default helmetData;
