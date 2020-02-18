import {
  string,
  bool,
  func,
  shape,
  oneOf,
  oneOfType,
  element,
  arrayOf,
} from 'prop-types';

/*
  type = input            短文字題
       = textarea         長文字題
       = radio            單選題
       = checkbox         複選題
       = file             檔案上傳
       = rating           評分題（1-5分）
       = customized       複合型題，render function 由外部傳入
*/
const QuestionShape = shape({
  // 問題
  title: string.isRequired,
  // 問題描述
  description: string,
  // 問題種類
  type: oneOf([
    'input',
    'textarea',
    'radio',
    'checkbox',
    'rating',
    'file',
    'customized',
  ]).isRequired,
  // 該題的值的 key
  key: string.isRequired,
  // 此題是否必填
  required: bool.isRequired,
  // 驗證內容的函數
  validator: func,
  // 如果 type=customized，代表此題是從外部傳入 render function。
  // 能不用則不用。
  renderCustomizedQuestion: func,
});

const FormBuilder = () => {};

FormBuilder.propTypes = {
  // 問卷標題
  title: string.isRequired,
  // 問卷描述
  description: oneOfType([string, element]),
  // 上傳按鈕的文字
  submitButtonText: oneOfType([string, element]).isRequired,
  // 上傳按鈕是否可按
  submitButtonEnabled: bool.isRequired,
  // 問題列表
  questions: arrayOf(QuestionShape),
  // 排版方式，目前只有一種，就是 typeform
  layout: string.isRequired,
  // 錯誤訊息的 Modal
  errorModal: oneOfType([string, element]),
  // 當使用者填寫內容，此函數會被觸發，且 emit 一個 object，包含被修改欄位的 key & value
  onChange: func.isRequired,
  // 當使用者按下送出鈕，且通過所有 question validator 驗證，此函數會被觸發
  onSubmit: func.isRequired,
  // 當使用者按下送出鈕，但有 question validator 驗證未過，此函數會被觸發
  onValidateFail: func,
  // 點擊下一步可額外觸發的函數 (可用於數據追蹤)
  onNext: func,
  // 點擊上一步考額外觸發的函數 (可用於數據追蹤)
  onPrev: func,
  // 點擊使用者條款 checkbox
  onClickAgreement: func,
  // 點擊關閉表單按鈕觸發的函數
  onClickCloseBtn: func.isRequired,
  // 真正要關閉表單前觸發的函數（可用於將資料存到 local storage）
  onClose: func,
};

FormBuilder.defaultProps = {
  layout: 'typeform',
};

export default FormBuilder;
