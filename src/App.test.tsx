import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Renders participant and message tabs', () => {
  const result = render(<App />);
  const participantsTab = result.getByText(/Participants.*/i);
  const messagesTab = result.getByText(/Messages.*/i);

  expect(participantsTab).toBeInTheDocument();
  expect(messagesTab).toBeInTheDocument();
});
