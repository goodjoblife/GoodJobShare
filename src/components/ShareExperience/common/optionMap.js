export const regionOptions = [
  '基隆市',
  '臺北市',
  '新北市',
  '桃園市',
  '新竹市',
  '新竹縣',
  '苗栗縣',
  '臺中市',
  '彰化縣',
  '南投縣',
  '雲林縣',
  '嘉義市',
  '嘉義縣',
  '臺南市',
  '高雄市',
  '屏東縣',
  '臺東縣',
  '花蓮縣',
  '宜蘭縣',
  '澎湖縣',
  '金門縣',
  '連江縣',
].map(region => ({
  label: region,
  value: region,
}));

export const experienceInYearOptions = Array(51).fill(0).map((_, index) => {
  if (index === 0) {
    return {
      label: '小於一年',
      value: index,
    };
  }
  return {
    label: index,
    value: index,
  };
});

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
    label: '面試方式',
    value: '面試方式',
  },
  {
    label: '面試官專業程度',
    value: '面試官專業程度',
  },
  {
    label: '整體心得',
    value: '整體心得',
  },
  {
    label: '給公司的建議',
    value: '給公司的建議',
  },
];

export const workExSectionSubtitleOptions = [
  {
    label: '自訂段落',
    value: '自訂段落',
  },
  {
    label: '實際工作內容',
    value: '實際工作內容',
  },
  {
    label: '工時狀況',
    value: '工時狀況',
  },
  {
    label: '薪資福利',
    value: '薪資福利',
  },
  {
    label: '公司管理方式',
    value: '公司管理方式',
  },
  {
    label: '獲得的成長',
    value: '獲得的成長',
  },
  {
    label: '給管理者的建議',
    value: '給管理者的建議',
  },
  {
    label: '升遷制度',
    value: '升遷制度',
  },
  {
    label: '整體心得',
    value: '整體心得',
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
