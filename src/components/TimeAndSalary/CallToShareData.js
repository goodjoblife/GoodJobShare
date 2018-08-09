import React from 'react';

export default () => (
  <section id="call-to-share-data" style={{ display: 'none' }}>
    <div className="dashed-line-box">
      <div className="not-login">
        哈囉！請先
        <button className="btn-login">登入</button>
        才能查看完整工時、薪資資訊喔
      </div>
      <div className="logined">
        請留下至少一筆資料，才能查看完整工時、薪資資訊。
        <br />
        沒有工作經驗嗎？沒有關係，分享以下連結給朋友，朋友留了資料，系統將開放您完整權限。
        <div className="share-link">
          <div className="link">
            <input type="text" id="user-link" />
          </div>
          <button className="button" data-copytarget="#user-link">
            複製連結
          </button>
        </div>
      </div>
      <div className="dashed-line-box__buttons">
        <a className="btn-m btn-black" href="/#section-form">
          馬上留資料
        </a>
        <div className="btn-m btn-yellow" id="share-rec-url">
          fb 貼文分享
        </div>
      </div>
    </div>
  </section>
);
