export const fragmentWorkExperienceFields = /* GraphQL */ `
  fragment workExperienceFields on WorkExperience {
    id
    type
    originalCompanyName
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
    recommend_to_others
    averageSectionRating
  }
`;

// Must be the same as fragment
export type WorkExperienceInOverview = {
  id: string;
  type: string;
  originalCompanyName: string;
  company: {
    name: string;
  };
  job_title: {
    name: string;
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: {
    amount: number;
    type: string;
  } | null;
  title: string | null;
  sections: {
    subtitle: string;
    content: string;
  }[];
  created_at: string;
  reply_count: number;
  like_count: number;
  recommend_to_others: string | null;
  averageSectionRating: number | null;
};

export const fragmentInterviewExperienceFields = /* GraphQL */ `
  fragment interviewExperienceFields on InterviewExperience {
    id
    type
    originalCompanyName
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
    averageSectionRating
  }
`;

// Must be the same as fragment
export type InterviewExperienceInOverview = {
  id: string;
  type: string;
  originalCompanyName: string;
  company: {
    name: string;
  };
  job_title: {
    name: string;
  };
  region: string;
  experience_in_year: number | null;
  education: string | null;
  salary: {
    amount: number;
    type: string;
  } | null;
  title: string | null;
  sections: {
    subtitle: string;
    content: string;
  }[];
  created_at: string; // ISO date string
  reply_count: number;
  like_count: number;
  averageSectionRating: number | null;
};
