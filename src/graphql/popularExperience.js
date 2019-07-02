export const getPopularExperiencesQuery = `
{
  popular_experiences(returnNumber: 3) {
    id
    type
    created_at
    title
    preview
    job_title {
      name
    }
    company {
      name
    }
    like_count
    reply_count
  }
}
`;
