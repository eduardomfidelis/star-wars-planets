function Filters({
  nameFilter,
  columnFilter,
  comparisonFilter,
  valueFilter,
  onNameFilterChange,
  onColumnFilterChange,
  onComparisonFilterChange,
  onValueFilterChange,
  onFilterButtonClick,
  numericFilters,
  onRemoveFilterClick,
}: any) {
  return (
    <div>
      <input
        type="text"
        value={ nameFilter }
        onChange={ onNameFilterChange }
        data-testid="name-filter"
        placeholder="Filtrar por nome"
      />

      <select
        value={ columnFilter }
        onChange={ onColumnFilterChange }
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
        onChange={ onComparisonFilterChange }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="text"
        value={ valueFilter }
        onChange={ onValueFilterChange }
        data-testid="value-filter"
      />

      <button data-testid="button-filter" onClick={ onFilterButtonClick }>
        Filtrar
      </button>

      {Object.keys(numericFilters).map((column) => (
        <div key={ column } data-testid="filter">
          {`${column} ${numericFilters[column]
            .comparison} ${numericFilters[column].value}`}
          {' '}
          <button onClick={ () => onRemoveFilterClick(column) }>x</button>
        </div>
      ))}

    </div>
  );
}

export default Filters;
