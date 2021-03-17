import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the Rhodium24 iframe', async () => {
  render(<App />);

  const iframe = await screen.findByTestId('rh24-iframe', undefined, { timeout: 3000 });

  expect(iframe).not.toBeNull();
});

test('should change document title after load the iframe', async () => {
  render(<App />)

  await screen.findByTestId('rh24-iframe', undefined, { timeout: 3000 });

  await waitFor(() => {
    expect(document.title).toHaveTextContent("Metal Heaven B.V.")
  }, { interval: 3000 })
})
