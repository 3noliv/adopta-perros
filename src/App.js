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
    ageRange: "",
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
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters(filters);
  };

  const convertAgeToMonths = (age) => {
    if (!age) return 0;
    const normalizedAge = age.toLowerCase().trim();
    const parts = normalizedAge.split(" ");
    if (parts.length < 2) return 0;
    const value = parseInt(parts[0]);
    const unit = parts[1];
    if (unit.startsWith("mes")) {
      return value;
    } else if (unit.startsWith("año")) {
      return value * 12;
    }
    return 0;
  };

  // Filtrar mascotas solo cuando se presiona el botón
  const filteredPets = pets.filter((pet) => {
    const petAgeInMonths = convertAgeToMonths(pet.edad);
    const selectedAgeRange = appliedFilters.ageRange;

    return (
      (appliedFilters.tipo ? pet.tipo === appliedFilters.tipo : true) &&
      (appliedFilters.genero ? pet.genero === appliedFilters.genero : true) &&
      (appliedFilters.estado ? pet.estado === appliedFilters.estado : true) &&
      (selectedAgeRange
        ? petAgeInMonths >= parseInt(selectedAgeRange.split("-")[0]) &&
          petAgeInMonths <= parseInt(selectedAgeRange.split("-")[1])
        : true)
    );
  });

  return (
    <div>
      <h1>Adopta una mascota</h1>
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <div className="filter-group">
          <h3>Tipo de animal:</h3>
          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Conejo">Conejo</option>
          </select>
        </div>

        <div className="filter-group">
          <h3>Sexo:</h3>
          <select
            name="genero"
            value={filters.genero}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="macho">Masculino</option>
            <option value="hembra">Femenino</option>
          </select>
        </div>

        <div className="filter-group">
          <h3>Estado:</h3>
          <select
            name="estado"
            value={filters.estado}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="adopcion">En adopción</option>
            <option value="adoptado">Adoptado</option>
            <option value="perdido">Perdido</option>
          </select>
        </div>

        <div className="filter-group">
          <h3>Rango de Edad:</h3>
          <select
            name="ageRange"
            value={filters.ageRange}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="0-5">0 a 5 meses</option>
            <option value="6-12">6 meses a 1 año</option>
            <option value="13-24">1 a 2 años</option>
            <option value="25-60">2 a 5 años</option>
            <option value="61-120">5 a 10 años</option>
            <option value="121-999">Más de 10 años</option>
          </select>
        </div>

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
