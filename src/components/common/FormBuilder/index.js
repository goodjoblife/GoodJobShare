import React, { useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import qs from 'qs';
import {
  string,
  bool,
  func,
  shape,
  oneOfType,
  element,
  arrayOf,
} from 'prop-types';

import QuestionBuilder from './QuestionBuilder';

const useCurrentIndex = () => {
  const location = useLocation();
  const query = useMemo(
    () => qs.parse(location.search, { ignoreQueryPrefix: true }),
    [location],
  );
  const currentIndex = parseInt(query.p, 10) || 0;

  const history = useHistory();
  const setCurrentIndex = useCallback(
    index => {
      history.push({
        search: qs.stringify({ ...query, p: index }, { addQueryPrefix: true }),
      });
    },
    [history, query],
  );

  return [currentIndex, setCurrentIndex];
};

const FormBuilder = ({
  open,
  title,
  description,
  submitButtonText,
  submitButtonEnabled,
  header: commonHeader,
  footer: commonFooter,
  questions,
  layout,
  onChange,
  onSubmit,
  onValidateFail,
  onNext,
  onPrev,
  onClickAgreement,
  onClickCloseBtn,
  onClose,
  msgModalContent,
  openMsgModal,
  onCloseMsgModal,
  onConfirmMsgModal,
}) => {
  const [currentIndex, setCurrentIndex] = useCurrentIndex();
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < questions.length - 1;
  const goPrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };
  const goNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const question = questions[currentIndex];
  if (!question) {
    return null;
  }
  const { header, footer, ...restOptions } = question;
  return (
    <div>
      <div>{header || commonHeader}</div>
      <QuestionBuilder {...restOptions} />
      <button onClick={goPrevious} disabled={!hasPrevious}>
        上一題
      </button>
      <button onClick={goNext} disabled={!hasNext}>
        下一題
      </button>
      <div>{footer || commonFooter}</div>
    </div>
  );
};

FormBuilder.propTypes = {
  // 表單是否開啟，等於 false 時表單關閉。
  open: bool.isRequired,
  // 問卷頁首 & 頁尾
  header: oneOfType([string, element]),
  footer: oneOfType([string, element]),
  // 上傳按鈕的文字
  submitButtonText: oneOfType([string, element]).isRequired,
  // 上傳按鈕是否可按
  submitButtonEnabled: bool.isRequired,
  // 問題列表
  questions: arrayOf(
    shape({
      header: oneOfType([string, element]),
      footer: oneOfType([string, element]),
      ...QuestionBuilder.propTypes,
    }),
  ).isRequired,
  // 排版方式，目前只有一種，就是 typeform
  layout: string.isRequired,
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

  // 訊息 Modal 的內容
  msgModalContent: oneOfType([string, element]),
  // 訊息 Modal 是否開啟
  openMsgModal: bool,
  // 使用者點擊 Modal 的關閉按鈕觸發的函數
  onCloseMsgModal: func,
  // 使用者點擊 Modal 的確認按鈕觸發的函數
  onConfirmMsgModal: func,
};

FormBuilder.defaultProps = {
  oepn: true,
  layout: 'typeform',
  openMsgModal: false,
};

export default FormBuilder;
