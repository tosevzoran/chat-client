import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabPanel from './TabPanel';

test('Tab panel', () => {
  const result = render(
    <TabPanel defaultTabId="2">
      <TabPanel.TabHeader tabId="1">tab 1</TabPanel.TabHeader>
      <TabPanel.TabHeader tabId="2">tab 2</TabPanel.TabHeader>
      <TabPanel.TabHeader tabId="3">tab 3</TabPanel.TabHeader>
      <div>
        <TabPanel.TabContent tabId="1">tab 1 content</TabPanel.TabContent>
        <TabPanel.TabContent tabId="2">tab 2 content</TabPanel.TabContent>
        <TabPanel.TabContent tabId="3">tab 3 content</TabPanel.TabContent>
      </div>
    </TabPanel>
  );

  let tab_content = result.getByText(/tab 2 content/i);
  expect(tab_content).toBeInTheDocument();

  const tab_1 = result.getByText('tab 1');
  fireEvent.click(tab_1);

  tab_content = result.getByText(/tab 1 content/i);
  expect(tab_content).toBeInTheDocument();
});
