import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('Teste se os seletores o botão e o input esta na tela', () => {
  render(<App />);

  const nameFilter = screen.getByTestId('name-filter')
  const columnFilter = screen.getByText(/population/)
  const compaarisonFilter = screen.getByText(/maior que/)
  const valueFilter = screen.getByTestId('value-filter')
  const btnFilter = screen.getByRole('button', { name: 'Filtrar' })
  const btnRemoveAllFilter = screen.getByRole('button', { name: 'Remover todas filtragens' })


  expect(valueFilter).toHaveValue('0')
  expect(nameFilter).toHaveValue('')
});

test('Teste se a funçao handleColumnFilterChange atualiza o estado columnFilter', () => {
  render(<App />)

  const columnFilter = screen.getByTestId("column-filter")
  userEvent.selectOptions(columnFilter, 'population')

  expect(columnFilter).toHaveValue('population')
})

test('Teste se a funçao handleComparisonFilterChange atualiza o estado de comparisonFilter', () => {
  render(<App />)

  const comparisonFilter = screen.getByTestId("comparison-filter")
  userEvent.selectOptions(comparisonFilter, 'igual a')

  expect(comparisonFilter).toHaveValue('igual a')
})

test('Teste se a função handleValueChange atualiza o estado valueChange', () => {
  render(<App />)

  const valueInput = screen.getByTestId("value-filter")
  userEvent.type(valueInput, '1000')

  expect(valueInput).toHaveValue('01000')
})