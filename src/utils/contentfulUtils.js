import * as contentful from 'contentful';

const accessToken = process.env.CONTENTFUL_TOKEN
  || '9910d888663cf6ffdf6e52cd82e54e2c320fc4cc23af21b2d2d4ab69e90fcda9';
const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE || 'rhotsuly6hr2';

const client = contentful.createClient({
  accessToken,
  space,
});

export default {
  fetchLaborRightsMetaList: () => client.getEntries({
    order: 'sys.createdAt',
    content_type: 'lecturePost',
    select: 'sys,fields.title,fields.coverImage',
  }).then(({ items }) => items.map(({
    sys: { id },
    fields: {
        title,
        coverImage: { fields: { file: { url: coverUrl } } },
    },
  }) => ({
    id,
    title,
    coverUrl,
  }))),
  fetchLaborRightsData: laborRightsId => client.getEntries({
    'sys.id': laborRightsId,
  }).then(({ items }) => {
    if (items.length === 1) {
      return items.pop();
    }
    // TODO fix format
    throw new Error('Entry not found only unique');
  }).then(({
    sys: { id },
    fields: {
      title,
      description,
      content,
      coverImage: { fields: { file: { url: coverUrl } } },
      seoTitle,
      seoDescription,
      hidingText,
    },
  }) => ({
    id,
    title,
    description,
    content,
    coverUrl,
    seoTitle,
    seoDescription,
    hidingText,
  })),
};
