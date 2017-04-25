export const SET_EXPERIENCE = '@@experienceDetail/SET_EXPERIENCE';

export const setExperience = experience => ({
  type: SET_EXPERIENCE,
  experience,
});

export const fetchExperience = _id =>
  dispatch => {
    const experience = {
      _id,
      type: 'interview',
      company: {
        name: '日月光半導體製造股份有限公司',
      },
      job_title: '半導體製程工程師',
      sections: [
        {
          subtitle: '',
          content: `是個很有特色的面試，或許也因為是新創公司吧
開始就直接是老闆來面試
一樣介紹完自己的背景跟動機之後就是老闆介紹公司
未來工作機會除公司本身的平台之外，因為也有接外面的整合行銷案子
所以也會要做一些event page

老闆也開宗明義地說自己的風格比較美式、直接
所以目前公司的經營狀態都會直接跟員工溝通
整個氛圍相對也比較自由
也說明因為公司也有一位資深的工程師
如果有機會進來能夠手把手的帶
算是對我來說最大的優點

有問我目前是不是有offer，對方開多少
老闆有提到也因為是新創公司
所以相對沒辦法像是外面有規模的公司給薪水這麼豪邁，也頂多跟其他offer差不多
但如果當月公司有盈餘賺錢的話也會撥一部分當作獎金 不過就看狀況
同時也會希望我能的話自備電腦`,
        },
      ],
    };

    dispatch(setExperience(experience));
  };
