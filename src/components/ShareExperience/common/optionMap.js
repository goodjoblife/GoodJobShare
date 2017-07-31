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
    placeholder: '例如：有幾關？實體/線上/筆試？流程？ 面試官有誰？',
  },
  {
    label: '面試心得',
    value: '面試心得',
    placeholder: '例如：面試流程很快/冗長、面試官態度友善與否 …等。',
  },
  {
    label: '給公司的建議',
    value: '給公司的建議',
    placeholder: '例如：希望可以尊重求職者、希望面試官對於公司福利可以明確說明...等。',
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
    placeholder: '實際工作內容是什麼？與當初面試時說明的有不同嗎？',
  },
  {
    label: '工時狀況',
    value: '工時狀況',
    placeholder: '例如：幾點上下班？經常加班？加班有淡旺季？要帶工作回家做？下班要收 Line？',
  },
  {
    label: '薪資福利',
    value: '薪資福利',
    placeholder: '例如：底薪、績效獎金、年終獎金、分紅、津貼補助等。',
  },
  {
    label: '公司管理方式',
    value: '公司管理方式',
    placeholder: '例如：採責任制、講求業績結果勝過一切。( ´•̥̥̥ω•̥̥̥` )',
  },
  {
    label: '獲得的成長',
    value: '獲得的成長',
    placeholder: '例如：專業技術、管理團隊的經驗、對市場的瞭解、對廠商的瞭解等等。',
  },
  {
    label: '給公司的建議',
    value: '給公司的建議',
    placeholder: '例如：「希望公司大會可以從每週改成每月一次 (´ཀ`) 」！！！」「希望公司可以開放在辦公室吃早餐 ( ; _ ; )/~~」',
  },
  {
    label: '升遷制度',
    value: '升遷制度',
    placeholder: '例如：一年考核一次，三年以上才有機會升主管。',
  },
  {
    label: '公司 / 團隊文化',
    value: '公司 / 團隊文化',
    placeholder: '例如：團隊成員向心力高、同事有很多是幹話王^_−☆',
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
