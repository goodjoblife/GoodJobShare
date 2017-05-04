import 'isomorphic-fetch';

const CONTENTFUL_API_HOST = process.env.CONTENTFUL_API_HOST
  || 'https://content-stage.goodjob.life';

export const fetchLaborRightsMetaList = () =>
  fetch(`${CONTENTFUL_API_HOST}/entries`)
    .then(response => {
      const json = response.json();
      if (response.status === 200) {
        return json;
      }
      return json.then(err => { throw err; });
    });

export const fetchLaborRightsData = laborRightsId =>
  fetch(`${CONTENTFUL_API_HOST}/entries/${laborRightsId}`)
    .then(response => {
      const json = response.json();
      if (response.status === 200) {
        return json;
      }
      return json.then(err => { throw err; });
    });
