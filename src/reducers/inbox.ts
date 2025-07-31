import createReducer from 'utils/createReducer';
import FetchBox, { getFetched } from 'utils/fetchBox';
import { READ_INBOX } from 'actions/inbox';

interface InboxMessage {
  id: string;
  title: string;
  link: string;
  date: Date;
  read: boolean;
}

interface InboxState {
  messages: FetchBox<InboxMessage[]>;
}

const preloadedState: InboxState = {
  messages: getFetched([
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: true,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: true,
    },
    {
      id: Math.random()
        .toString()
        .replace(/\D/g, ''),
      title: '網友們分享了台積電股份有限公司軟體工程師的10 筆最薪資資料',
      link: 'experiences/6810ccae07e773897e22812e',
      date: new Date(),
      read: false,
    },
  ]),
};

const inbox = createReducer<
  InboxState,
  { [READ_INBOX]: { type: typeof READ_INBOX } }
>(preloadedState, {
  [READ_INBOX]: (state: InboxState) => ({
    ...state,
    messages: {
      ...state.messages,
      data:
        state.messages.data &&
        state.messages.data.map((message: InboxMessage) => ({
          ...message,
          read: true,
        })),
    },
  }),
});

export default inbox;
