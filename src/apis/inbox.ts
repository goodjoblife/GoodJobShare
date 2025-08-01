import graphqlClient from 'utils/graphqlClient';
import {
  queryInboxGql,
  readInboxGql,
  readInboxMessageGql,
} from 'graphql/inbox';
import { InboxMessage } from 'constants/inbox';

// queries

interface BaseNotification {
  __typename: string;
  id: string;
  createdAt: string;
  isRead: boolean;
}

interface SomeoneReplyMyExperienceNotification extends BaseNotification {
  __typename: 'SomeoneReplyMyExperienceNotification';
  experience: { id: string };
}

interface SomeoneLikeMyExperienceNotification extends BaseNotification {
  __typename: 'SomeoneLikeMyExperienceNotification';
  experience: { id: string };
}

interface SomeoneLikeMyReplyNotification extends BaseNotification {
  __typename: 'SomeoneLikeMyReplyNotification';
  reply: { experience: { id: string } };
}

type Notification =
  | SomeoneReplyMyExperienceNotification
  | SomeoneLikeMyExperienceNotification
  | SomeoneLikeMyReplyNotification;

const mapNotification = (notification: Notification): InboxMessage | null => {
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

interface QueryInboxResult {
  notificationCountSinceBellLastOpen: number;
  userNotifications: InboxMessage[];
}

export const queryInboxApi = async ({
  token,
  start,
  limit,
}: {
  token?: string;
  start: number;
  limit: number;
}): Promise<QueryInboxResult> => {
  const {
    notificationCountSinceBellLastOpen,
    userNotifications,
  } = await graphqlClient<{
    notificationCountSinceBellLastOpen: number;
    userNotifications: Notification[];
  }>({
    variables: { start, limit },
    query: queryInboxGql,
    token,
  });

  const mappedNotifications: InboxMessage[] = userNotifications
    .map(mapNotification)
    .filter(
      (notification): notification is InboxMessage => notification !== null,
    );

  return {
    notificationCountSinceBellLastOpen,
    userNotifications: mappedNotifications,
  };
};

// mutations

interface MutateInboxResponse {
  success: boolean;
}

export const readInboxApi = async ({ token }: { token?: string }) => {
  const { success } = await graphqlClient<MutateInboxResponse>({
    query: readInboxGql,
    token,
  });

  return success;
};

export const readInboxMessageApi = async ({
  token,
  id,
}: {
  token?: string;
  id: string;
}) => {
  const { success } = await graphqlClient<MutateInboxResponse>({
    query: readInboxMessageGql,
    token,
    variables: { id },
  });

  return success;
};
