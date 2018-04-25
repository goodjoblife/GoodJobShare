// TODO: fake api response
export const fetchCampaignList = () => Promise.resolve([
  {
    name: 'software-engineer',
    title: '軟體工程師',

    // 跟填寫表單頁面有關
    formTitle: '軟體工程師大調查',  // 表單標題
    formIntroduction: '#### 軟體工程師高工時的問題 .... ',  // 表單標題下的簡介，是 markdown 格式
    formEnding: '#### 我們這一次與電資工會合作',  // 表單結尾內容，是 markdown 格式
    defaultJobTitle: '軟體工程師',  // 表單中職稱預設填寫的內容
    defaultContent: '加班的狀況為何：\n\n 年終幾個月：',  // 職場甘苦談的預設問題
    extraFields: [  // 額外的欄位名稱
      { key: 'ptt', title: 'PTT' },
    ],

    // 跟查詢頁面有關
    queryJobTitles: ['軟體工程師', '前端工程師'],  // 查詢頁會搜尋的職稱列表
  },
]);

export const foo = 1;
