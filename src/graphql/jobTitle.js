export const getJobTitleQuery = `
query($jobTitle: String!) {
  job_title(name: $jobTitle) {
    interview_experiences {
      id
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
        amount
        type
      }
      title
      sections {
        subtitle
        content
      }
      created_at
      reply_count
      like_count
      overall_rating
    }
    work_experiences {
      id
      type
      company {
        name
      }
    	region
      experience_in_year
      education
      salary {
        amount
        type
      }
      title
      sections {
        subtitle
        content
      }
      created_at
      reply_count
      like_count
      recommend_to_others
    }
  }
}
`;
