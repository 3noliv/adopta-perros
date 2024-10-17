import React, { useState, useEffect } from "react";
import PetList from "./components/PetList";
import AdoptionForm from "./components/AdoptionForm";
import "./App.css";

const App = () => {
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [filters, setFilters] = useState({
    tipo: "",
    genero: "",
    estado: "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  // Obtener los datos de la API
  useEffect(() => {
    fetch("https://huachitos.cl/api/animales")
      .then((response) => response.json())
      .then((data) => setPets(data.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleAdopt = (pet) => {
    setSelectedPet(pet);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Actualiza el filtro solo para la categoría seleccionada
    setFilters((prev) => ({
      ...prev,
      [name]: prev[name] === value ? "" : value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters(filters);
  };

  const filteredPets = pets.filter((pet) => {
    return (
      (appliedFilters.tipo ? pet.tipo === appliedFilters.tipo : true) &&
      (appliedFilters.genero ? pet.genero === appliedFilters.genero : true) &&
      (appliedFilters.estado ? pet.estado === appliedFilters.estado : true)
    );
  });

  return (
    <div>
      <h1>Adopta una mascota</h1>
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="filter-group">
          <h3>Tipo de animal:</h3>
          <div className="button-group">
            <label>
              <input
                type="checkbox"
                name="tipo"
                value="Perro"
                checked={filters.tipo === "Perro"}
                onChange={handleFilterChange}
              />
              Perro
            </label>
            <label>
              <input
                type="checkbox"
                name="tipo"
                value="Gato"
                checked={filters.tipo === "Gato"}
                onChange={handleFilterChange}
              />
              Gato
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Sexo:</h3>
          <div className="button-group">
            <label>
              <input
                type="checkbox"
                name="genero"
                value="macho"
                checked={filters.genero === "macho"}
                onChange={handleFilterChange}
              />
              Masculino
            </label>
            <label>
              <input
                type="checkbox"
                name="genero"
                value="hembra"
                checked={filters.genero === "hembra"}
                onChange={handleFilterChange}
              />
              Femenino
            </label>
          </div>
        </div>

        <div className="filter-group">
          <h3>Estado:</h3>
          <div className="button-group">
            <label>
              <input
                type="checkbox"
                name="estado"
                value="adopcion"
                checked={filters.estado === "adopcion"}
                onChange={handleFilterChange}
              />
              En adopción
            </label>
            <label>
              <input
                type="checkbox"
                name="estado"
                value="Adoptado"
                checked={filters.estado === "Adoptado"}
                onChange={handleFilterChange}
              />
              Adoptado
            </label>
          </div>
        </div>

        {/* Botón de filtrar dentro del formulario */}
        <div className="filter-button">
          <button type="submit">FILTRAR</button>
        </div>
      </form>

      {!selectedPet ? (
        <PetList pets={filteredPets} handleAdopt={handleAdopt} />
      ) : (
        <AdoptionForm pet={selectedPet} />
      )}
    </div>
  );
};

export default App;
