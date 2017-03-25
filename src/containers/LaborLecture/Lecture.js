import { connect } from 'react-redux'

import Lecture from '../../components/LaborLecture/Lecture'

const mapStateToProps = (state, { params: { lecture } }) => ({
    lecture,
    content:[
        {
            type: 'text',
            data: '「今天又要加班了⋯ 重點是，根本沒有加班費😭」\n「主管要我們打卡下班後，再繼續加班耶😠」\n「拜託，我們連個打卡機都沒有好不好👻」',
        }, {
            type: 'text',
            data: '', 
        }, {
            type: 'text',
            data: '【「雇主（好像）違法怎麼辦❓❗】 遇到職場上常見的各種違法現象，我們身為公司的一名小小螺絲釘，應該如何保護自己呢？ 　 第二堂勞動知識小教室，要教你如何 滿滿的 維護自身工作權益哦！',
        }, {
            type: 'text',
            data: '',
        }, {
            type: 'image',
            data: '',
        }, {
            type: 'image',
            data: '',
        }, {
            type: 'text',
            data: '補充說明\n1. 搜尋公司註冊所在地的勞工局或勞檢處時，可以用 「地點名 勞工 申訴 檢舉」作為關鍵字，例如: 【台北市 勞工 申訴 檢舉】\n2. 【勞保局民眾檢舉書】：http://www.bli.gov.tw/sub.aspx?a=iJLgM7lOuro%3D\n3. 健保署網站： https://www.nhi.gov.tw/',
        },
    ],
});

export default connect(mapStateToProps)(Lecture);
