export const getExperienceQuery = `
query($id:ID!) {
  experience(id:$id) {
    type
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
    sections {
      subtitle
      content
    }
    like_count
    liked

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
