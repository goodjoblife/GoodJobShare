import { JobTitleCount } from './groupJobTitles';

export type TabKey = 'salary' | 'interview' | 'work';

export type MockRecord = {
  title: string;
  monthsAgo: number;
  figure: string;
  meta: string;
};

// 薪水&加班：國泰人壽真實職稱分佈（取樣自 goodjob.life 公開 API 的實際筆數）。
const SALARY_ROWS: [string, number][] = [
  ['高級專員', 11],
  ['襄理', 9],
  ['業務主任', 8],
  ['實習生', 8],
  ['保險業務╱經紀人', 8],
  ['軟體工程師', 7],
  ['行政專員', 4],
  ['中級專員', 4],
  ['行政人員', 3],
  ['統計精算人員', 3],
  ['業務', 3],
  ['CIP實習生', 2],
  ['資深副理', 2],
  ['系統分析師', 2],
  ['精算人員', 2],
  ['理賠人員', 2],
  ['業務員', 2],
  ['數據分析師', 2],
  ['專員', 2],
  ['客服專員', 2],
  ['副理', 2],
  ['QC人員', 1],
  ['CREDIT RESEARCH ANALYST', 1],
  ['C級專員', 1],
  ['電話客服類人員', 1],
  ['軟體設計工程師', 1],
  ['資訊行政專員', 1],
  ['資訊', 1],
  ['資深行政', 1],
  ['資深客服', 1],
  ['資料工程師', 1],
  ['資料分析師', 1],
  ['財務分析╱財務人員', 1],
  ['行銷企劃人員', 1],
  ['網頁設計師', 1],
  ['經辦', 1],
  ['組訓專員', 1],
  ['組訓', 1],
  ['程式設計師', 1],
  ['理賠經辦', 1],
  ['理賠專員', 1],
  ['理賠', 1],
  ['業務專員', 1],
  ['投資管理人員', 1],
  ['應用開發工程師', 1],
  ['展業課長', 1],
  ['專案企劃', 1],
  ['客服', 1],
  ['外匯交易員', 1],
  ['外匯', 1],
  ['國內業務人員', 1],
  ['商用不動產營運管理師', 1],
  ['區主任', 1],
  ['分析師', 1],
  ['債券交易員', 1],
  ['保險業務員', 1],
  ['企業風險管理人員', 1],
  ['不動產管理師', 1],
  ['不動產管理一部實習生', 1],
];

// 面試經驗 / 工作經驗：示意用模擬資料，非實際筆數。
const INTERVIEW_ROWS: [string, number][] = [
  ['軟體工程師', 14],
  ['業務', 12],
  ['高級專員', 10],
  ['保險業務╱經紀人', 9],
  ['實習生', 9],
  ['業務主任', 6],
  ['行政專員', 5],
  ['客服專員', 4],
  ['理賠專員', 4],
  ['資料工程師', 3],
  ['業務員', 3],
  ['襄理', 3],
  ['專員', 2],
  ['客服', 2],
  ['理賠人員', 2],
  ['應用開發工程師', 1],
  ['財務分析╱財務人員', 1],
  ['組訓專員', 1],
  ['行政人員', 1],
];

const WORK_ROWS: [string, number][] = [
  ['高級專員', 9],
  ['行政專員', 8],
  ['系統分析師', 6],
  ['CIP實習生', 5],
  ['ＣＡＰ實習生', 5],
  ['業務主任', 5],
  ['軟體工程師', 4],
  ['客服專員', 4],
  ['理賠專員', 3],
  ['業務', 3],
  ['襄理', 3],
  ['資料分析師', 2],
  ['行政人員', 2],
  ['專員', 2],
  ['組訓', 1],
  ['理賠', 1],
  ['資訊', 1],
  ['副理', 1],
];

const toJobTitleCounts = (rows: [string, number][]): JobTitleCount[] =>
  rows.map(([name, count]) => ({ name, count }));

// label（tab 顯示文字）刻意不放在這裡：頁面用 constants/companyJobTitle.ts 的
// tabTypeTranslation 顯示真實產品用語（評價／面試），避免兩處各講一套。
export const TABS: Record<
  TabKey,
  { resultLabel: string; jobTitles: JobTitleCount[] }
> = {
  salary: {
    resultLabel: '薪資分享',
    jobTitles: toJobTitleCounts(SALARY_ROWS),
  },
  interview: {
    resultLabel: '面試分享',
    jobTitles: toJobTitleCounts(INTERVIEW_ROWS),
  },
  work: {
    resultLabel: '工作經驗分享',
    jobTitles: toJobTitleCounts(WORK_ROWS),
  },
};

// 簡易決定性亂數（mulberry32 風格），同一個 seed 字串永遠產生同一組結果，
// 讓 demo 每次渲染都拿到一樣的假資料，不會因為 Math.random 而閃爍。
const seededRandom = (seed: string): (() => number) => {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
};

const salaryTierOf = (name: string): [number, number] => {
  if (/實習/.test(name)) return [26000, 32000];
  if (/(副理|襄理|主任|經理|課長)/.test(name)) return [52000, 76000];
  if (/工程師|分析師|設計師/.test(name)) return [48000, 82000];
  if (/業務/.test(name)) return [34000, 72000];
  if (/專員|經辦|人員/.test(name)) return [32000, 50000];
  return [30000, 55000];
};

const INTERVIEW_FEEL = ['普通', '簡單', '有點難', '偏難'];
const INTERVIEW_OUTCOME = ['錄取', '未錄取', '婉拒 Offer'];
const OVERTIME_FREQ = ['幾乎不加班', '偶爾加班', '常態加班', '加班頻繁'];

const pick = <T>(rand: () => number, options: T[]): T =>
  options[Math.floor(rand() * options.length)];

// 依職稱的 count 展開成一筆一筆的模擬分享紀錄，用來讓下方結果清單
// 在套用篩選後看起來像真的資料在變動，而不是一段靜態文字。
export const buildMockRecordPool = (
  tabKey: TabKey,
  jobTitles: JobTitleCount[],
): MockRecord[] => {
  const pool: MockRecord[] = [];
  jobTitles.forEach(({ name, count }) => {
    const rand = seededRandom(`${tabKey}::${name}`);
    for (let i = 0; i < count; i++) {
      const monthsAgo = Math.floor(rand() * 30) + 1;
      if (tabKey === 'salary') {
        const [lo, hi] = salaryTierOf(name);
        const salary = Math.round((lo + rand() * (hi - lo)) / 500) * 500;
        pool.push({
          title: name,
          monthsAgo,
          figure: `NT$ ${salary.toLocaleString()}`,
          meta: `${monthsAgo} 個月前分享・月薪`,
        });
      } else if (tabKey === 'interview') {
        const feel = pick(rand, INTERVIEW_FEEL);
        const outcome = pick(rand, INTERVIEW_OUTCOME);
        pool.push({
          title: name,
          monthsAgo,
          figure: `面試感受：${feel}`,
          meta: `${monthsAgo} 個月前分享・${outcome}`,
        });
      } else {
        const freq = pick(rand, OVERTIME_FREQ);
        const rating = Math.floor(rand() * 5) + 1;
        pool.push({
          title: name,
          monthsAgo,
          figure: `${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}`,
          meta: `${monthsAgo} 個月前分享・${freq}`,
        });
      }
    }
  });
  return pool.sort((a, b) => a.monthsAgo - b.monthsAgo);
};
