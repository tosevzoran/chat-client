import React from 'react';
import { useSelector } from 'react-redux';
import TabPanel from 'components/tab/TabPanel';
import MessageList from 'components/messages/List';
import ParticipantsList from 'components/participants/List';
import ErrorOverlay from 'components/error/ErrorOverlay';
import styled from 'styled-components';
import { connectionSelector } from 'store/connectionReducer';

const Container = styled.div`
  max-width: 50rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  background-color: #fff;
  flex: 1;
  overflow-y: hidden;
  height: 100%;
`;

const TabHeader = styled(TabPanel.TabHeader)<{ isActive?: boolean }>`
  display: inline-flex;
  align-items: center;
  height: 2.5rem;
  padding: 0 2rem;

  outline: none;

  &.active {
    background-color: #ffffff;
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
  }

  &.active:last-child {
    border-top-right-radius: 0;
  }

  &.active:first-child {
    border-top-left-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: normal;
  margin: 1.5rem auto;
`;

function App() {
  const isLive = useSelector(connectionSelector);

  return (
    <Container>
      <Title>Status Meeting Standup</Title>
      <TabPanel defaultTabId="messages">
        <div>
          <TabHeader tabId="participants">Participants</TabHeader>
          <TabHeader tabId="messages">Messages</TabHeader>
        </div>
        <Content>
          <TabPanel.TabContent tabId="participants">
            <ParticipantsList />
          </TabPanel.TabContent>
          <TabPanel.TabContent tabId="messages">
            <MessageList />
          </TabPanel.TabContent>
        </Content>
      </TabPanel>
      {!isLive && <ErrorOverlay />}
    </Container>
  );
}

export default App;
