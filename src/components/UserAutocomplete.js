import React, { Fragment } from 'react';
import styled from 'styled-components';

const Text = styled.span`
  font-family: avenirnext-demibold;
  font-size: 15px;
  color: #ffffff;
  letter-spacing: 0.01px;
`;

const At = styled.span.attrs({ children: '@' })`
  font-family: AvenirNext-Medium;
  font-size: 23px;
  color: #ffffff;
  opacity: 0.23;
  letter-spacing: 0.01px;
  margin-right: 8px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Description = styled.span`
  font-family: AvenirNext-Medium;
  font-size: 14px;
  color: #ffffff;
  opacity: 0.23;
  letter-spacing: 0.01px;
  margin-right: 8px;
`;

export default function UserAutocomplete({
  item: { username, firstname, lastname }
}) {
  return (
    <Fragment>
      <Container>
        <At />
        <Text>
          {firstname} {lastname}
        </Text>
      </Container>
      <Description>{username}</Description>
    </Fragment>
  );
}
