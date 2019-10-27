import React from 'react';
import styled from 'styled-components';
import SmartInput from './components/SmartInput';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #24252A;
`;

const Content = styled.div`
  width: 600px;
`;

export default function App() {
  return (
    <Container>
      <Content>
        <SmartInput />
      </Content>
    </Container>
  );
}
