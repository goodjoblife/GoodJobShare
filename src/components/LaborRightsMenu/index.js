import React from 'react';
import Helmet from 'react-helmet';
import * as contentful from 'contentful';

import Columns from '../common/Columns';
import Container from './Container';
import LectureEntry from './LectureEntry';

class LaborLecture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    const SPACE_ID = 'siutzcg6nl4g';
    const ACCESS_TOKEN =
      'ef08dee7812e4bbd8c9856776426ade160ea263c2972d19b381b29aae95e4c61';

    const client = contentful.createClient({
      space: SPACE_ID,
      accessToken: ACCESS_TOKEN,
    });

    client.getEntries().then(
      ({ items }) => items.map(({
        sys: { id },
        fields: { title, cover_photo: { fields: { file: { url } } } },
      }) => ({
        id,
        title,
        coverUrl: url,
      }))
    ).then(items => {
      this.setState({
        items,
      });
    }).catch(() => {});
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        <Container>
          <p className="headingL">勞動小教室</p>
          <Columns
            Item={LectureEntry}
            items={this.state.items}
          />
        </Container>
      </main>
    );
  }
}

LaborLecture.propTypes = {
  items: React.PropTypes.array,
};

export default LaborLecture;
