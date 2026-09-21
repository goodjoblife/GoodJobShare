import fetchUtil from 'utils/fetchUtil';

// TODO: 待後端補上對應的 GraphQL mutation 後改用 graphqlClient
const postExperienceReply = ({ id, comment, token }) =>
  fetchUtil(`/experiences/${id}/replies`).post({
    body: {
      content: comment,
    },
    token,
  });

export default postExperienceReply;
