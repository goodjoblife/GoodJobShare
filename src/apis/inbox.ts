import graphqlClient from 'utils/graphqlClient';
import {
  queryInboxGql,
  readInboxGql,
  readInboxMessageGql,
  QueryInboxResult,
  ReadInboxResult,
  ReadInboxMessageResult,
  Notification,
  SomeoneReplyMyExperienceNotification,
  SomeoneLikeMyExperienceNotification,
  SomeoneLikeMyReplyNotification,
} from 'graphql/inbox';
import { InboxMessage } from 'constants/inbox';

// queries

const mapToInboxMessage = (notification: Notification): InboxMessage | null => {
  const { __typename, id, createdAt, isRead, ...rest } = notification;

  switch (__typename) {
    case 'SomeoneReplyMyExperienceNotification': {
      const {
        experience: { id: experienceId },
      } = rest as SomeoneReplyMyExperienceNotification;
      return {
        id,
        link: `/experiences/${experienceId}`,
        title: '有人回覆你的面試經驗',
        date: new Date(createdAt),
        read: isRead,
      };
    }

    case 'SomeoneLikeMyExperienceNotification': {
      const {
        experience: { id: experienceId },
      } = rest as SomeoneLikeMyExperienceNotification;
      return {
        id,
        link: `/experiences/${experienceId}`,
        title: '有人按讚你的面試經驗',
        date: new Date(createdAt),
        read: isRead,
      };
    }

    case 'SomeoneLikeMyReplyNotification': {
      const {
        reply: {
          experience: { id: experienceId },
        },
      } = rest as SomeoneLikeMyReplyNotification;
      return {
        id,
        link: `/experiences/${experienceId}`,
        title: '有人按讚你的回覆',
        date: new Date(createdAt),
        read: isRead,
      };
    }

    default:
      console.error('Unknown notification type', __typename);
      return null;
  }
};

export const queryInboxApi = async ({
  token,
  start,
  limit,
}: {
  token?: string;
  start: number;
  limit: number;
}): Promise<{
  unreadCount: number;
  messages: InboxMessage[];
}> => {
  const {
    notificationCountSinceBellLastOpen,
    userNotifications,
  } = await graphqlClient<QueryInboxResult>({
    variables: { start, limit },
    query: queryInboxGql,
    token,
  });

  const messages: InboxMessage[] = userNotifications
    .map(mapToInboxMessage)
    .filter(
      (notification): notification is InboxMessage => notification !== null,
    );

  return {
    unreadCount: notificationCountSinceBellLastOpen,
    messages,
  };
};

// mutations

export const readInboxApi = async ({ token }: { token?: string }) => {
  const { openNotificationBell } = await graphqlClient<ReadInboxResult>({
    query: readInboxGql,
    token,
  });

  return openNotificationBell.success;
};

export const readInboxMessageApi = async ({
  token,
  id,
}: {
  token?: string;
  id: string;
}) => {
  const { markNotificationAsRead } = await graphqlClient<
    ReadInboxMessageResult
  >({
    query: readInboxMessageGql,
    token,
    variables: { id },
  });

  return markNotificationAsRead.success;
};
