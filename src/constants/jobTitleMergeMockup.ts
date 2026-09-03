// ⚠️ Demo 用假資料：職稱合併 mockup。
// 正式實作時這整個檔案應由後端 API 取代。

import R from 'ramda';

// 別名 → 正規名
export const JOB_TITLE_ALIAS_MAP: Record<string, string> = {
  'frontend engineer': '前端工程師',
  'front-end engineer': '前端工程師',
  'front end engineer': '前端工程師',
  'frontend developer': '前端工程師',
  前端開發: '前端工程師',
  前端: '前端工程師',
  'backend engineer': '後端工程師',
  'back-end engineer': '後端工程師',
  'backend developer': '後端工程師',
  後端: '後端工程師',
  'fullstack engineer': '全端工程師',
  'full stack engineer': '全端工程師',
  'full-stack engineer': '全端工程師',
  全端: '全端工程師',
  'software engineer': '軟體工程師',
  'software developer': '軟體工程師',
  'sw engineer': '軟體工程師',
  軟體開發工程師: '軟體工程師',
  軟體研發工程師: '軟體工程師',
  'ios engineer': 'iOS 工程師',
  'ios developer': 'iOS 工程師',
  'android engineer': 'Android 工程師',
  'android developer': 'Android 工程師',
  'data engineer': '資料工程師',
  數據工程師: '資料工程師',
  'mechanical engineer': '機械工程師',
  'me engineer': '機械工程師',
  'equipment engineer': '設備工程師',
  設備: '設備工程師',
  'process engineer': '製程工程師',
  半導體製程工程師: '製程工程師',
  'product manager': '產品經理',
  pm: '產品經理',
  產品經理: '產品經理',
};

// 正規名 → 細分職稱（依資料筆數由多到少）
const SOFTWARE_ENGINEER_SUB_TITLES: [string, number][] = [
  ['前端工程師', 1284],
  ['後端工程師', 1132],
  ['全端工程師', 876],
  ['Android 工程師', 512],
  ['iOS 工程師', 498],
  ['資料工程師', 431],
  ['韌體工程師', 402],
  ['嵌入式系統工程師', 377],
  ['DevOps 工程師', 351],
  ['測試工程師', 340],
  ['QA 工程師', 318],
  ['機器學習工程師', 297],
  ['演算法工程師', 262],
  ['系統工程師', 251],
  ['雲端工程師', 233],
  ['網站工程師', 219],
  ['遊戲工程師', 204],
  ['資安工程師', 198],
  ['SRE 工程師', 187],
  ['資料庫工程師', 176],
  ['區塊鏈工程師', 164],
  ['影像處理工程師', 152],
  ['驅動程式工程師', 148],
  ['Linux 核心工程師', 141],
  ['Python 工程師', 137],
  ['Java 工程師', 133],
  ['C++ 工程師', 129],
  ['Golang 工程師', 121],
  ['Node.js 工程師', 118],
  ['.NET 工程師', 112],
  ['PHP 工程師', 106],
  ['Ruby 工程師', 98],
  ['Unity 工程師', 94],
  ['Unreal 工程師', 87],
  ['App 工程師', 83],
  ['Flutter 工程師', 79],
  ['React Native 工程師', 74],
  ['自動化測試工程師', 71],
  ['CI/CD 工程師', 66],
  ['MLOps 工程師', 62],
  ['NLP 工程師', 58],
  ['電腦視覺工程師', 55],
  ['推薦系統工程師', 51],
  ['搜尋工程師', 48],
  ['大數據工程師', 45],
  ['ETL 工程師', 42],
  ['BI 工程師', 39],
  ['GIS 工程師', 36],
  ['嵌入式 Linux 工程師', 33],
  ['FPGA 軟體工程師', 31],
  ['車用軟體工程師', 28],
  ['醫療軟體工程師', 25],
  ['金融軟體工程師', 22],
  ['ERP 工程師', 19],
  ['SAP 工程師', 17],
];

export type SubJobTitle = { name: string; count: number };

const toSubJobTitles = (pairs: [string, number][]): SubJobTitle[] =>
  pairs.map(([name, count]) => ({ name, count }));

export const JOB_TITLE_SUB_TITLES_MAP: Record<string, SubJobTitle[]> = {
  軟體工程師: toSubJobTitles(SOFTWARE_ENGINEER_SUB_TITLES),
  工程師: toSubJobTitles([
    ['軟體工程師', 5120],
    ['設備工程師', 2210],
    ['製程工程師', 1980],
    ['機械工程師', 1520],
    ['硬體工程師', 1330],
    ['電子工程師', 1210],
    ['韌體工程師', 402],
  ]),
  前端工程師: toSubJobTitles([
    ['React 工程師', 210],
    ['Vue 工程師', 143],
    ['Angular 工程師', 52],
  ]),
};

const normalize = (name: string): string => name.trim().toLowerCase();

export const toCanonicalJobTitle = (name: string): string =>
  JOB_TITLE_ALIAS_MAP[normalize(name)] || name;

export const isJobTitleAlias = (name: string): boolean =>
  toCanonicalJobTitle(name) !== name;

export const getSubJobTitles = (name: string): SubJobTitle[] =>
  JOB_TITLE_SUB_TITLES_MAP[toCanonicalJobTitle(name)] || [];

// 把一串職稱名轉成正規名並去重，保留原順序
export const canonicalizeJobTitles = (names: string[]): string[] =>
  R.uniq(names.map(toCanonicalJobTitle));
