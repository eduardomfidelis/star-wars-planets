import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('Teste se os seletores o botão e o input esta na tela', () => {
  render(<App />);

  const nameFilter = screen.getByTestId('name-filter')
  const columnFilter = screen.getByText(/population/)
  const compaarisonFilter = screen.getByText(/maior que/)
  const valueFilter = screen.getByTestId('value-filter')
  const btnFilter = screen.getByRole('button', { name: 'Filtrar' })


  expect(valueFilter).toHaveValue('0')
});
