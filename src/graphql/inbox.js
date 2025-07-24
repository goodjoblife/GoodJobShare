export const queryInboxGql = /* GraphQL */ `
  query($start: Int, $limit: Int) {
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
  mutation($ids: [ID!]!) {
    markNotificationAsRead(input: { notificationIds: $ids }) {
      success
    }
  }
`;
