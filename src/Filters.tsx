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
  availableColumns,
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
        {availableColumns.map((column: any) => (
          <option key={ column } value={ column }>
            {column}
          </option>
        ))}
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
