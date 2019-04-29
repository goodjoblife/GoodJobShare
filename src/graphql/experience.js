export const getExperienceQuery = `
query($id:ID!) {
  experience(id:$id) {
    id
    type
    company {
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
    created_at
    reply_count
    report_count
    like_count
    status
    archive {
      is_archived
      reason
    }

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
      data_time {
        year
        month
      }
      week_work_time
      recommend_to_others
    }
  }
}
`;
