// QueryInbox

// Enum for Experience __typename
export enum ExperienceType {
  InterviewExperience = 'InterviewExperience',
  WorkExperience = 'WorkExperience',
}

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
          __typename
        }
      }

      ... on UserLikeMyExperienceNotification {
        experience {
          id
          __typename
        }
      }

      ... on UserLikeMyReplyNotification {
        reply {
          experience {
            id
            __typename
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

export type Experience = {
  id: string;
  __typename: ExperienceType;
};

export type UserReplyMyExperienceNotification = BaseNotification & {
  __typename: 'UserReplyMyExperienceNotification';
  experience: Experience;
};

export type UserLikeMyExperienceNotification = BaseNotification & {
  __typename: 'UserLikeMyExperienceNotification';
  experience: Experience;
};

export type UserLikeMyReplyNotification = BaseNotification & {
  __typename: 'UserLikeMyReplyNotification';
  reply: { experience: Experience };
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
