export const queryExperienceGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      id
      type
      originalCompanyName
      company {
        name
        salary_work_time_statistics {
          job_average_salaries {
            job_title {
              name
            }
            average_salary {
              type
              amount
            }
            data_count
          }
        }
      }
      job_title {
        name
        salary_distribution {
          bins {
            data_count
            range {
              type
              from
              to
            }
          }
        }
      }
      region
      experience_in_year
      education
      salary {
        type
        amount
      }
      title
      created_at

      ... on InterviewExperience {
        sections {
          interview_subtitle: subtitle
          content
        }
        interview_time {
          year
          month
        }
        interview_result
        overall_rating
        interview_qas {
          question
          answer
        }
        interview_sensitive_questions
      }

      ... on WorkExperience {
        sections {
          work_subtitle: subtitle
          content
        }
        week_work_time
        recommend_to_others
      }
    }
  }
`;

export const queryExperienceLikeGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      liked
    }
  }
`;

export const createInterviewExperience = `
mutation CreateInterviewExperience($input: CreateInterviewExperienceInput!) {
  createInterviewExperience(input: $input) {
    success
    experience {
      id
    }
  }
}`;

export const createWorkExperience = `
mutation CreateWorkExperience($input: CreateWorkExperienceInput!) {
  createWorkExperience(input: $input) {
    success
    experience {
      id
    }
  }
}`;

export const queryRelatedExperiencesGql = /* GraphQL */ `
  query($id: ID!, $start: Int!, $limit: Int!) {
    experience(id: $id) {
      id
      relatedExperiences(start: $start, limit: $limit) {
        id
        type
        originalCompanyName
        company {
          name
        }
        job_title {
          name
        }
        created_at
        salary {
          type
          amount
        }

        ... on InterviewExperience {
          sections {
            interview_subtitle: subtitle
            content
          }
          overall_rating
        }

        ... on WorkExperience {
          sections {
            work_subtitle: subtitle
            content
          }
          week_work_time
          recommend_to_others
        }
      }
    }
  }
`;

export const createExperienceLikeGql = /* GraphQL */ `
  mutation($input: CreateExperienceLikeInput!) {
    createExperienceLike(input: $input) {
      experienceLike {
        id
      }
    }
  }
`;

export const deleteExpereinceLikeGql = /* GraphQL */ `
  mutation($input: DeleteExperienceLikeInput!) {
    deleteExperienceLike(input: $input) {
      deletedExperienceId
    }
  }
`;

export const queryExperienceCountGql = /* GraphQL */ `
  query {
    experienceCount
  }
`;
