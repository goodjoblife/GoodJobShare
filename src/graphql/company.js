export const getCompanyQuery = `
query($companyName: String!) {
  company(name: $companyName) {
    interview_experiences {
      id
      type
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
      recommend_to_others
    }
  }
}
`;
