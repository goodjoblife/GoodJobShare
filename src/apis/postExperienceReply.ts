import fetchUtil from 'utils/fetchUtil';

type FetchMethods = {
  post: (options: { body: unknown; token?: string }) => Promise<unknown>;
};

const postExperienceReply = ({
  id,
  comment,
  token,
}: {
  id: string;
  comment: string;
  token?: string;
}): Promise<unknown> =>
  (fetchUtil(`/experiences/${id}/replies`) as FetchMethods).post({
    body: {
      content: comment,
    },
    token,
  });

export default postExperienceReply;
