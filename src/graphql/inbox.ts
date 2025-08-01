// QueryInbox

type BaseNotification = {
  __typename: string;
  id: string;
  isRead: boolean;
  createdAt: string;
};

export type SomeoneReplyMyExperienceNotification = BaseNotification & {
  __typename: 'SomeoneReplyMyExperienceNotification';
  experience: { id: string };
};

export type SomeoneLikeMyExperienceNotification = BaseNotification & {
  __typename: 'SomeoneLikeMyExperienceNotification';
  experience: { id: string };
};

export type SomeoneLikeMyReplyNotification = BaseNotification & {
  __typename: 'SomeoneLikeMyReplyNotification';
  reply: { experience: { id: string } };
};

export type Notification =
  | SomeoneReplyMyExperienceNotification
  | SomeoneLikeMyExperienceNotification
  | SomeoneLikeMyReplyNotification;

export const queryInboxGql = /* GraphQL */ `
  query($start: Int, $limit: Int) {
    notificationCountSinceBellLastOpen
    userNotifications(start: $start, limit: $limit) {
      id
      isRead
      createdAt

      __typename

      ... on SomeoneReplyMyExperienceNotification {
        experience {
          id
        }
      }

      ... on SomeoneLikeMyExperienceNotification {
        experience {
          id
        }
      }

      ... on SomeoneLikeMyReplyNotification {
        reply {
          experience {
            id
          }
        }
      }
    }
  }
`;

export type QueryInboxResult = {
  notificationCountSinceBellLastOpen: number;
  userNotifications: Notification[];
};

// ReadInbox

export const readInboxGql = /* GraphQL */ `
  mutation($id: ID!) {
    openNotificationBell {
      success
    }
  }
`;

export type ReadInboxResult = {
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
