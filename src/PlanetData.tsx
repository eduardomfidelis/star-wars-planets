/*
import React, { useEffect, useState } from 'react';
import Table from './Table';

export default function PlanetData() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      setPlanets(data.results);
    }
    fetchPlanets();
  }, []);

  console.log(planets);

  return (
    <div>
      <Table planets={ planets } />
    </div>
  );
}
* */
