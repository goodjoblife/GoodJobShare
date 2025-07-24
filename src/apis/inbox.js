import graphqlClient from 'utils/graphqlClient';
import { queryInboxGql, readInboxGql } from 'graphql/inbox';

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
  const { userNotifications } = await graphqlClient({
    variables: { start, limit },
    query: queryInboxGql,
    token,
  });

  return userNotifications.map(mapNotification);
};

export const readInboxApi = async ({ token, ids }) => {
  const { success } = await graphqlClient({
    query: readInboxGql,
    token,
    variables: { ids },
  });

  return success;
};
