import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(Container)`
  position: absolute;
  background-color: #99999980;
`;

const Content = styled.div`
  position: relative;
  z-index: 1000;
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: normal;
`;

const ErrorOverlay = () => {
  return (
    <Container>
      <Content>
        <Title>Error in connection establishment</Title>
        <p>Refresh the page to try again.</p>
      </Content>
      <Overlay></Overlay>
    </Container>
  );
};

export default ErrorOverlay;
