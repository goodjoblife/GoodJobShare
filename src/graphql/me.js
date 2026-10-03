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

export const queryMyPublishesGql = /* GraphQL */ `
  query MyPublishes {
    me {
      experiences {
        id
        type
        title
        status
        created_at
        archive {
          is_archived
          reason
        }
      }

      replies {
        id
        content
        experience {
          id
          title
        }
        status
        created_at
      }

      salary_work_times {
        id
        company {
          name
        }
        job_title {
          name
        }
        status
        created_at
        archive {
          is_archived
          reason
        }
      }
    }
  }
`;
