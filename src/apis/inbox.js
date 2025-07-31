import graphqlClient from 'utils/graphqlClient';
import {
  queryInboxGql,
  readInboxGql,
  readInboxMessageGql,
} from 'graphql/inbox';

const mapNotification = ({ __typename, id, createdAt, isRead, ...rest }) => {
  switch (__typename) {
    case 'SomeoneReplyMyExperienceNotification': {
      const {
        experience: { id: experienceId },
      } = rest;
      return {
        link: `/experiences/${experienceId}`,
        title: '有人回覆你的面試經驗',
        date: createdAt,
        read: isRead,
      };
    }

    case 'SomeoneLikeMyExperienceNotification': {
      const {
        experience: { id: experienceId },
      } = rest;
      return {
        link: `/experiences/${experienceId}`,
        title: '有人按讚你的面試經驗',
        date: createdAt,
        read: isRead,
      };
    }

    case 'SomeoneLikeMyReplyNotification': {
      const {
        reply: {
          experience: { id: experienceId },
        },
      } = rest;
      return {
        link: `/experiences/${experienceId}`,
        title: '有人按讚你的回覆',
        date: createdAt,
        read: isRead,
      };
    }

    default:
      console.error('Unknown notification type', __typename);
      return null;
  }
};

export const queryInboxApi = async ({ token, start, limit }) => {
  const {
    notificationCountSinceBellLastOpen,
    userNotifications,
  } = await graphqlClient({
    variables: { start, limit },
    query: queryInboxGql,
    token,
  });

  userNotifications = userNotifications.map(mapNotification);

  return {
    notificationCountSinceBellLastOpen,
    userNotifications,
  };
};

export const readInboxApi = async ({ token }) => {
  const { success } = await graphqlClient({
    query: readInboxGql,
    token,
  });

  return success;
};

export const readInboxMessageApi = async ({ token, id }) => {
  const { success } = await graphqlClient({
    query: readInboxMessageGql,
    token,
    variables: { id },
  });

  return success;
};
