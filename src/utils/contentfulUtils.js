import * as contentful from 'contentful';

const accessToken = process.env.CONTENTFUL_TOKEN
  || '92728b01e5f9536eccb6d4caff0ea92561bc1c742faea65732690f38f5840426';
const space = process.env.CONTENTFUL_LABOR_RIGHTS_SPACE || 'rbeukh8vheqy';

const client = contentful.createClient({
  accessToken,
  space,
});

export default {
  fetchLaborRightsMetaList: () => client.getEntries({
    order: 'sys.createdAt',
    content_type: 'labor-lecture',
    select: 'fields.title,fields.coverImage',
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
    content_type: 'labor-lecture',
    'sys.id': laborRightsId,
  }).then(({ items }) => {
    if (items.length === 1) {
      return items.pop();
    }
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
