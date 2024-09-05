export const queryMyPermissionGql = /* GraphQL */ `
  {
    me {
      permission {
        hasAllPermission
      }
    }
  }
`;
export const queryMeGql = /* GraphQL */ `
  {
    me {
      _id
      facebook_id
      name
      email
      email_status
    }
  }
`;

export const queryMyExperienceIdsGql = /* GraphQL */ `
  query MyPublishes {
    me {
      experiences {
        id
      }
    }
  }
`;

export const queryMySalaryWorkTimesIdsGql = /* GraphQL */ `
  query MyPublishes {
    me {
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
        archive {
          is_archived
          reason
        }
      }
    }
  }
`;
