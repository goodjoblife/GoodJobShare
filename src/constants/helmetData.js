
import { FACEBOOK_APP_ID } from '../config';
import { formatTitle, formatCanonicalPath } from '../utils/helmetHelper';
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

export const imgHost = 'https://image.goodjob.life';
export const SITE_NAME = 'GoodJob 職場透明化運動';
export const HELMET_DATA = {
  DEFAULT: {
    defaultTitle: SITE_NAME,
    titleTemplate: `%s | ${SITE_NAME}`,
    meta: [
      { name: 'description', content: '匿名分享你的工時、薪資，讓我們求職不再面議！' },
      { name: 'keywords', content: '工作時間, 薪資福利, 面試經驗, 工作經驗, 實習經驗, 工作評論, 職場資訊透明化' },
      { property: 'og:title', content: SITE_NAME },
      { property: 'og:url', content: formatCanonicalPath('/') },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${imgHost}/og/default-06-April.jpg` },
      { property: 'og:description', content: '匿名分享你的工時、薪資，讓我們求職不再面議！' },
      { property: 'og:locale', content: 'zh_TW' },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'fb:app_id', content: FACEBOOK_APP_ID },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/') },
    ],
  },
  LANDING_PAGE: {
    meta: [
      { property: 'og:image', content: `${imgHost}/og/default-06-April.jpg` },
    ],
  },
  SHARE: {
    title: '分享你的職場資訊',
    meta: [
      { property: 'og:title', content: formatTitle('分享你的職場資訊', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/share') },
      { property: 'og:image', content: `${imgHost}/og/share-work.jpg` },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share') },
    ],
  },
  SHARE_INTERVIEW: {
    title: '面試經驗分享',
    meta: [
      { property: 'og:title', content: formatTitle('面試經驗分享', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/share/interview') },
      { property: 'og:image', content: `${imgHost}/og/share-interview.jpg` },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share/interview') },
    ],
  },
  SHARE_TIME_SALARY: {
    title: '薪資工時分享',
    meta: [
      { property: 'og:title', content: formatTitle('薪資工時分享', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/share/time-and-salary') },
      { property: 'og:image', content: `${imgHost}/og/share-time-and-salary.jpg` },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share/time-and-salary') },
    ],
  },
  SHARE_WORK: {
    title: '工作經驗分享',
    meta: [
      { property: 'og:title', content: formatTitle('工作經驗分享', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/share/work-experiences') },
      { property: 'og:image', content: `${imgHost}/og/share-work.jpg` },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/share/work-experiences') },
    ],
  },
  EXPERIENCE_SEARCH: {
    // information is dynamic
  },
  EXPERIENCE_DETAIL: {
    // information is dynamic
  },
  LABOR_RIGHTS_MENU: {
    title: '勞動知識小教室',
    meta: [
      { name: 'description', content: '我們看見勞工們的需要，推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，內容涵蓋勞動基準法、性別工作平等法、就業服務法以及工會相關法令等勞工必備的權益資訊。讓勞工認識自己的權益，學會保護自己。' },
      { property: 'og:title', content: formatTitle('勞動知識小教室', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/labor-rights') },
      { property: 'og:image', content: `${imgHost}/og/labor-rights.jpg` },
      { property: 'og:description', content: '我們看見勞工們的需要，推出【勞動知識小教室】系列懶人包，將複雜的法律資訊轉換成易懂的圖文，內容涵蓋勞動基準法、性別工作平等法、就業服務法以及工會相關法令等勞工必備的權益資訊。讓勞工認識自己的權益，學會保護自己。' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/labor-rights') },
    ],
  },
  LABOR_RIGHTS_SINGLE: {
    // information is dynamic
  },
  ABOUT: {
    title: '關於我們',
    meta: [
      { name: 'description', content: '在過去求職的經驗中，我們發現台灣的求職資訊相當不透明。 薪資、工時的資訊經常不得而知，而實際工作內容也與當初求職網站說明的有所出入。 因此，我們決定採取行動，嘗試解決求職市場資訊不透明的問題，讓我們在找工作時，能夠做出更好的選擇。' },
      { property: 'og:title', content: formatTitle('關於我們', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/about') },
      { property: 'og:image', content: `${imgHost}/og/about.jpg` },
      { property: 'og:description', content: '在過去求職的經驗中，我們發現台灣的求職資訊相當不透明。 薪資、工時的資訊經常不得而知，而實際工作內容也與當初求職網站說明的有所出入。 因此，我們決定採取行動，嘗試解決求職市場資訊不透明的問題，讓我們在找工作時，能夠做出更好的選擇。' },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/about') },
    ],
  },
  PRIVACY_POLICY: {
    title: '隱私權政策',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: formatTitle('隱私權政策', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/privacy-policy') },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/privacy-policy') },
    ],
  },
  USER_TERMS: {
    title: '使用者條款',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: formatTitle('使用者條款', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/user-terms') },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/user-terms') },
    ],
  },
  FAQ: {
    title: '常見問答',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: formatTitle('常見問答', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/faq') },
      { property: 'og:image', content: `${imgHost}/og/faq.jpg` },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/faq') },
    ],
  },
  GUIDELINES: {
    title: '發文留言規則',
    meta: [
      { name: 'description', content: '' },
      { property: 'og:title', content: formatTitle('發文留言規則', SITE_NAME) },
      { property: 'og:url', content: formatCanonicalPath('/guidelines') },
    ],
    link: [
      { rel: 'canonical', href: formatCanonicalPath('/guidelines') },
    ],
  },
};
