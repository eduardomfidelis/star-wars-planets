import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';

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
    Filters();
  }, [nameFilter, planets, numericFilters]);

  const Filters = () => {
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

  return (
    <div>
      <input
        type="text"
        value={ nameFilter }
        onChange={ handleNameFilterChange }
        data-testid="name-filter"
        placeholder="Filtrar por nome"
      />

      <select
        value={ columnFilter }
        onChange={ handleColumnFilterChange }
        data-testid="column-filter"
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>

      <select
        value={ comparisonFilter }
        onChange={ handleComparisonFilterChange }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="text"
        value={ valueFilter }
        onChange={ handleValueFilterChange }
        data-testid="value-filter"
      />

      <button data-testid="button-filter" onClick={ handleFilterButtonClick }>
        Filtrar
      </button>

      <Table planets={ filteredPlanets.length > 0 ? filteredPlanets : planets } />
    </div>
  );
}

export default App;
