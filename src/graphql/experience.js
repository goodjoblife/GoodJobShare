export const getExperienceQuery = `
query($id:ID!) {
  experience(id:$id) {
    id
    type
    company {
      name
      interview_experiences {
        id
        type
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
        overall_rating
        sections {
          subtitle
          content
        }
      }
      work_experiences {
        id
        type
        company {
          name
        }
        job_title {
          name
        }
        created_at
        sections {
          subtitle
          content
        }
        week_work_time
        salary {
          type
          amount
        }
        recommend_to_others
      }
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
      interview_experiences {
        id
        type
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
        overall_rating
        sections {
          subtitle
          content
        }
      }
      work_experiences {
        id
        type
        company {
          name
        }
        job_title {
          name
        }
        created_at
        sections {
          subtitle
          content
        }
        week_work_time
        salary {
          type
          amount
        }
        recommend_to_others
      }
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
    sections {
      subtitle
      content
    }
    like_count
    liked
    created_at

    ...on InterviewExperience {
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

    ...on WorkExperience {
      week_work_time
      recommend_to_others
    }
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
        sections {
          subtitle
          content
        }

        ... on InterviewExperience {
          overall_rating
        }

        ... on WorkExperience {
          week_work_time
          recommend_to_others
        }
      }
    }
  }
`;
