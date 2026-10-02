import graphqlClient from 'utils/graphqlClient';

const queryExperienceRepliesGql = /* GraphQL */ `
  query($id: ID!) {
    experience(id: $id) {
      replies {
        id
        content
        like_count
        floor
        created_at
        liked
      }
    }
  }
`;

export type Reply = {
  id: string;
  content: string;
  like_count: number;
  floor: number;
  created_at: string;
  liked: boolean;
};

type QueryExperienceRepliesData = {
  experience: { replies: Reply[] } | null;
};

const queryExperienceReplies = ({
  id,
  token,
}: {
  id: string;
  token?: string;
}): Promise<Reply[]> =>
  graphqlClient<QueryExperienceRepliesData>({
    query: queryExperienceRepliesGql,
    variables: { id },
    token,
  }).then(data => {
    if (data.experience === null) {
      throw new Error(`Experience ${id} not found`);
    }
    return data.experience.replies;
  });

export default queryExperienceReplies;
