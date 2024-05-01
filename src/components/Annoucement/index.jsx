import React, { useState } from 'react';
import Modal from 'common/Modal';
import { Heading } from 'common/base';
import { LS_HAS_READ_FB_LOGIN_ISSUE_ANNOUNCEMENT_KEY } from 'constants/localStorageKey';
import { useLocalStorage } from 'react-use';

const AnnoucementModal = () => {
    const [isOpen, setIsOpen] = useState(true)
    const [hasReadFbLoginIssueAnnoucement, setHasReadFbLoginIssueAnnoucement] = useLocalStorage(
        LS_HAS_READ_FB_LOGIN_ISSUE_ANNOUNCEMENT_KEY
    );
    return (
        <Modal
            isOpen={isOpen && !hasReadFbLoginIssueAnnoucement}
            hasClose={true}
            close={() => {
                setIsOpen(false)
                setHasReadFbLoginIssueAnnoucement(true)
            }}
            closableOnClickOutside={true}
            size="m"
        >
            <div>
                <Heading size="m" marginBottomS center={true}>網站重要公告</Heading>
                <div>
                    <p>因 Facebook (現名 Meta）政策之調整，部分使用者無法正常使用 Facebook 登入。本站人員正積極解決此問題。在這段期間請改使用 Google 登入。</p>
                    <br></br>
                    <p>若您曾經使用 Facebook 登入之帳號購買解鎖方案，因無法登入而無法閱讀本站之內容，請聯繫 findyourgoodjob@gmail.com 進行退費。</p>
                    <br></br>
                    <p>GoodJob 團隊 2024.04.30</p>
                </div>
            </div>
        </Modal>
    )
}

export default AnnoucementModal;