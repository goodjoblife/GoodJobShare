export const regionOptions = [
  '彰化縣',
  '嘉義市',
  '嘉義縣',
  '新竹市',
  '新竹縣',
  '花蓮縣',
  '高雄市',
  '基隆市',
  '金門縣',
  '連江縣',
  '苗栗縣',
  '南投縣',
  '新北市',
  '澎湖縣',
  '屏東縣',
  '臺中市',
  '臺南市',
  '臺北市',
  '臺東縣',
  '桃園市',
  '宜蘭縣',
  '雲林縣',
].map(region => ({
  label: region,
  value: region,
}));

export const experienceInYearOptions = Array(51).fill(0).map((_, index) => ({
  label: index,
  value: index,
}));

export const educationOptions = [
  {
    label: '大學',
    value: '大學',
  },
  {
    label: '碩士',
    value: '碩士',
  },
  {
    label: '博士',
    value: '博士',
  },
  {
    label: '高職',
    value: '高職',
  },
  {
    label: '五專',
    value: '五專',
  },
  {
    label: '二專',
    value: '二專',
  },
  {
    label: '二技',
    value: '二技',
  },
  {
    label: '高中',
    value: '高中',
  },
  {
    label: '國中',
    value: '國中',
  },
  {
    label: '國小',
    value: '國小',
  },
];

export const interviewResultMap = [
  {
    label: '錄取',
    value: '錄取',
  },
  {
    label: '未錄取',
    value: '未錄取',
  },
  {
    label: '沒通知',
    value: '沒通知',
  },
  {
    label: '其他',
    value: '',
  },
];

export const salaryTypeOptions = [
  {
    label: '年薪',
    value: 'year',
  },
  {
    label: '月薪',
    value: 'month',
  },
  {
    label: '日薪',
    value: 'day',
  },
  {
    label: '時薪',
    value: 'hour',
  },
];

export const interviewSectionSubtitleOptions = [
  {
    label: '自訂段落',
    value: '自訂段落',
  },
  {
    label: '面試過程',
    value: '面試過程',
  },
  {
    label: '面試時間',
    value: '面試時間',
  },
  {
    label: '公司管理制度',
    value: '公司管理制度',
  },
  {
    label: '公司環境',
    value: '公司環境',
  },
  {
    label: '公司前景發展',
    value: '公司前景發展',
  },
];

export const interviewSensitiveQuestionsMap = [
  {
    label: '詢問家庭狀況',
    value: '詢問家庭狀況',
  },
  {
    label: '曾詢問婚姻狀況、生育計畫',
    value: '曾詢問婚姻狀況、生育計畫',
  },
  {
    label: '曾要求繳交身分證、保證金',
    value: '曾要求繳交身分證、保證金',
  },
  {
    label: '其他',
    value: '其他',
  },
];

export const overallRatingDialogMap = {
  1: '差',
  2: '普通',
  3: '不錯啦～',
  4: '很好！',
  5: '大推！',
};


export const isEmployedOptions = [
  {
    label: '在職',
    value: 'yes',
  },
  {
    label: '已離職',
    value: 'no',
  },
];

export const jobEndingTimeYearOptions = Array(11).fill(0).map((_, index) => ({
  label: new Date().getFullYear() - index,
  value: new Date().getFullYear() - index,
}));

export const jobEndingTimeMonthOptions = Array(12).fill(0).map((_, index) => ({
  label: index,
  value: index,
}));

export const recommendToOthersOptions = [
  {
    label: '推',
    value: 'yes',
  },
  {
    label: '不推',
    value: 'no',
  },
  {
    label: '難說喔',
    value: "don't know",
  },
];
