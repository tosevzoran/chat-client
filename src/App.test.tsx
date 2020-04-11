import React from 'react';
import { render } from 'test/test-utils';
import App from './App';

test('Renders participant and message tabs', () => {
  const result = render(<App />);
  const participantsTab = result.getByText('Participants');
  const messagesTab = result.getByText('Messages');

  expect(participantsTab).toBeInTheDocument();
  expect(messagesTab).toBeInTheDocument();
});
