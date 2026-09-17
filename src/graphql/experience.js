export const experiencePartialGql = /* GraphQL */ `
  id
  type
  originalCompanyName
  reportCount
  reports {
    id
    reasonCategory
    reason
    createdAt
  }
  company {
    name
  }
  job_title {
    name
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
`;

export const interviewExperiencePartialGql = ({
  sectionTitleKey = 'subtitle',
} = {}) => /* GraphQL */ `
  sections {
    ${sectionTitleKey}: subtitle
    content
    rating
  }
  interview_time {
    year
    month
  }
  interview_result
  averageSectionRating
  interview_qas {
    question
    answer
  }
  interview_sensitive_questions
  reply_count
  like_count
`;

export const workExperiencesPartialGql = ({
  sectionTitleKey = 'subtitle',
} = {}) => /* GraphQL */ `
  sections {
    ${sectionTitleKey}: subtitle
    content
    aspect
    rating
  }
  week_work_time
  recommend_to_others
  averageSectionRating
  reply_count
  like_count
  sector
  gender
  jobLevel
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
