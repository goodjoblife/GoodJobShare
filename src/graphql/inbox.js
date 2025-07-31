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

export const readInboxGql = /* GraphQL */ `
  mutation($id: ID!) {
    openNotificationBell {
      success
    }
  }
`;

export const readInboxMessageGql = /* GraphQL */ `
  mutation($id: ID!) {
    markNotificationAsRead(input: { notificationIds: [$id] }) {
      success
    }
  }
`;
