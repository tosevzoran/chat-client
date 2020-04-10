import React from 'react';
import TabPanel from 'components/tab/TabPanel';
import MessageList from 'components/messages/List';
import ParticipantsList from 'components/participants/List';
import styled from 'styled-components';

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
  }
  &:hover {
    cursor: pointer;
  }
`;

function App() {
  return (
    <Container>
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
    </Container>
  );
}

export default App;
