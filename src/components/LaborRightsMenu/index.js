import React from 'react';
import Helmet from 'react-helmet';
import * as contentful from 'contentful';

import Container from './Container';
import Columns from './Columns';
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
      ({ items: entries }) => {
        const items = entries.map(({
          sys: { id },
          fields: { title, cover_photo: { fields: { file: { url } } } },
        }) => ({
          id,
          title,
          cover_photo: url,
        }));
        this.setState({
          items,
        });
      }
    ).catch(() => {});
  }

  render() {
    return (
      <main>
        <Helmet title="勞動小教室" />
        <Container>
          <h3 className="headingL">勞動小教室</h3>
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
