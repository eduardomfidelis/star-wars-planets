import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import Filters from './Filters';

function App() {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState('0');
  const [numericFilters, setNumericFilters] = useState<{
    [column: string]: { comparison: string; value: string };
  }>({});

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
    }
    fetchPlanets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [nameFilter, planets, numericFilters]);

  const applyFilters = () => {
    let filteredData = planets;

    filteredData = filteredData.filter((planet: any) => {
      return planet.name.toLowerCase().includes(nameFilter.toLowerCase());
    });

    Object.keys(numericFilters).forEach((column) => {
      const { comparison, value } = numericFilters[column];
      filteredData = filteredData.filter((planet) => {
        const planetValue = Number(planet[column]);
        switch (comparison) {
          case 'maior que':
            return planetValue > Number(value);
          case 'menor que':
            return planetValue < Number(value);
          case 'igual a':
            return planetValue === Number(value);
          default:
            return true;
        }
      });
    });

    setFilteredPlanets(filteredData);
  };

  const handleNameFilterChange = (event: any) => {
    setNameFilter(event.target.value);
  };

  const handleColumnFilterChange = (event: any) => {
    setColumnFilter(event.target.value);
  };

  const handleComparisonFilterChange = (event: any) => {
    setComparisonFilter(event.target.value);
  };

  const handleValueFilterChange = (event: any) => {
    setValueFilter(event.target.value);
  };

  const handleFilterButtonClick = () => {
    setNumericFilters((prevFilters) => ({
      ...prevFilters,
      [columnFilter]: { comparison: comparisonFilter, value: valueFilter },
    }));
  };

  const handleRemoveFilterClick = (column: string) => {
    const newNumericFilters = { ...numericFilters };
    delete newNumericFilters[column];
    setNumericFilters(newNumericFilters);
  };

  const handleRemoveAllFiltersClick = () => {
    setNumericFilters({});
  };

  return (
    <div>
      <Filters
        nameFilter={ nameFilter }
        columnFilter={ columnFilter }
        comparisonFilter={ comparisonFilter }
        valueFilter={ valueFilter }
        onNameFilterChange={ handleNameFilterChange }
        onColumnFilterChange={ handleColumnFilterChange }
        onComparisonFilterChange={ handleComparisonFilterChange }
        onValueFilterChange={ handleValueFilterChange }
        onFilterButtonClick={ handleFilterButtonClick }
        numericFilters={ numericFilters }
        onRemoveFilterClick={ handleRemoveFilterClick }
      />

      <button
        data-testid="button-remove-filters"
        onClick={ handleRemoveAllFiltersClick }
      >
        Remover todas filtragens
      </button>

      <Table planets={ filteredPlanets.length > 0 ? filteredPlanets : planets } />
    </div>
  );
}

export default App;
