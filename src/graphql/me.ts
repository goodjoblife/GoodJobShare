export const queryMyPermissionGql = /* GraphQL */ `
  {
    me {
      permission {
        hasAllPermission
      }
    }
  }
`;

export const queryMyPublishIdsGql = /* GraphQL */ `
  query MyPublishes {
    me {
      experiences {
        id
      }
      salary_work_times {
        id
      }
    }
  }
`;
