// QueryInbox

export const queryInboxGql = /* GraphQL */ `
  query($start: Int, $limit: Int) {
    notificationCountSinceBellLastOpen
    userNotifications(start: $start, limit: $limit) {
      id
      isRead
      createdAt

      __typename

      ... on UserReplyMyExperienceNotification {
        experience {
          id
        }
      }

      ... on UserLikeMyExperienceNotification {
        experience {
          id
        }
      }

      ... on UserLikeMyReplyNotification {
        reply {
          experience {
            id
          }
        }
      }
    }
  }
`;

type BaseNotification = {
  __typename: string;
  id: string;
  isRead: boolean;
  createdAt: string;
};

export type UserReplyMyExperienceNotification = BaseNotification & {
  __typename: 'UserReplyMyExperienceNotification';
  experience: { id: string };
};

export type UserLikeMyExperienceNotification = BaseNotification & {
  __typename: 'UserLikeMyExperienceNotification';
  experience: { id: string };
};

export type UserLikeMyReplyNotification = BaseNotification & {
  __typename: 'UserLikeMyReplyNotification';
  reply: { experience: { id: string } };
};

export type Notification =
  | UserReplyMyExperienceNotification
  | UserLikeMyExperienceNotification
  | UserLikeMyReplyNotification;

export type QueryInboxResult = {
  notificationCountSinceBellLastOpen: number;
  userNotifications: Notification[];
};

// OpenInbox

export const openInboxGql = /* GraphQL */ `
  mutation {
    openNotificationBell {
      success
    }
  }
`;

export type OpenInboxResult = {
  openNotificationBell: {
    success: boolean;
  };
};

// ReadInboxMessage

export const readInboxMessageGql = /* GraphQL */ `
  mutation($id: ID!) {
    markNotificationAsRead(input: { notificationIds: [$id] }) {
      success
    }
  }
`;

export type ReadInboxMessageResult = {
  markNotificationAsRead: {
    success: boolean;
  };
};
