function Filters({ filters, setFilters }) {
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <select name="type" onChange={handleFilterChange}>
        <option value="">All Types</option>
        <option value="dog">Dog</option>
        <option value="cat">Cat</option>
      </select>
      {/* Otros filtros para edad, sexo, etc. */}
    </div>
  );
}

export default Filters;
