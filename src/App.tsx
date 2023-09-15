import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';

function App() {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
    }
    fetchPlanets();
  }, []);

  const planetsNameFilter = nameFilter.trim() === '' ? planets : planets
    .filter((planet: any) => planet.name.toLowerCase()
      .includes(nameFilter.toLowerCase()));

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setNameFilter(event.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={ nameFilter }
        onChange={ handleChange }
        data-testid="name-filter"
      />
      <Table planets={ planetsNameFilter } />

    </div>
  );
}

export default App;
