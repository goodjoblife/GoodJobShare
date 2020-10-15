export const getMeQuery = `
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

export const getMyPublishesQuery = `
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

export const getMyUnlockedContentsQuery = `
query MyUnlockedContents {
  me {
    unlocked_experience_records {
      unlocked_time
      data {
        id
        title
        type
      }
    }
    unlocked_salary_work_time_records {
      unlocked_time
      data {
        id
        job_title {
          name
        }
        company {
          name
        }
      }
    }
  }
}
`;
