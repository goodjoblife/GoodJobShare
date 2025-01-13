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

      __typename

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
          aspect
          rating
        }
        week_work_time
        recommend_to_others
        averageSectionRating
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

export const createInterviewExperienceWithRating = /* GraphQL */ `
  mutation($input: CreateInterviewExperienceWithRatingInput!) {
    createInterviewExperienceWithRating(input: $input) {
      success
      experience {
        id
      }
    }
  }
`;

export const createWorkExperienceWithRating = `
mutation CreateWorkExperienceWithRating($input: CreateWorkExperienceWithRatingInput!) {
  createWorkExperienceWithRating(input: $input) {
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

        __typename

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
            aspect
            rating
          }
          week_work_time
          recommend_to_others
          averageSectionRating
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
