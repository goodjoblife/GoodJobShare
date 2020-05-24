import React from 'react';
import { Section, Wrapper, Heading, P } from 'common/base';
import Button from 'common/button/Button';
//import ButtonRect from 'common/button/Button';
//import i from 'common/icons';

class LaborUnionDetail extends React.Component {
  render() {
    return (
      <Section padding>
        <Wrapper size="m">
          <Heading size="l">台灣電子電機資訊產業公會</Heading>
          <P>test</P>
          <Button btnStyle="buttonHoverYellow" circleSize="md">
            馬上加入
          </Button>
        </Wrapper>
      </Section>
    );
  }
}

export default LaborUnionDetail;
