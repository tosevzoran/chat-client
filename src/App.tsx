import React from 'react';
import TabPanel from 'components/tab/TabPanel';
import MessageList from 'components/messages/List';
import ParticipantsList from 'components/participants/List';
import styled from 'styled-components';

const messages = [
  {
    id: 1,
    text:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    username: 'Lorem Ipsum',
    timestamp: 23479547398,
    isEdited: false,
  },
  {
    id: 2,
    text:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
    username: 'Richard McClintock',
    timestamp: 57498734587,
    isEdited: false,
  },
  {
    id: 3,
    text:
      'Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance.',
    username: 'Finibus Bonorum',
    timestamp: 57477373451,
    isEdited: true,
  },
];

const users = [
  {
    id: 1,
    username: 'Lorem Ipsum',
  },
  {
    id: 2,
    username: 'Richard McClintock',
  },
  {
    id: 3,
    username: 'Finibus Bonorum',
  },
];

const Container = styled.div`
  max-width: 50rem;
  margin: 2rem auto;
`;

const Content = styled.div`
  background-color: #fff;
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
        <TabHeader tabId="participants">Participants</TabHeader>
        <TabHeader tabId="messages">Messages</TabHeader>
        <Content>
          <TabPanel.TabContent tabId="participants">
            <ParticipantsList participants={users} />
          </TabPanel.TabContent>
          <TabPanel.TabContent tabId="messages">
            <MessageList messages={messages} />
          </TabPanel.TabContent>
        </Content>
      </TabPanel>
    </Container>
  );
}

export default App;
