import React, { useState, useEffect } from 'react';
import Filters from './components/Filters';
import PetList from './components/PetList';
import AdoptionForm from './components/AdoptionForm';

function App() {
  const [filters, setFilters] = useState({ type: '', age: '', status: '', sex: '' });
  const [pets, setPets] = useState([]); // Asegurarse de que siempre es un arreglo
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptionData, setAdoptionData] = useState({ name: '', email: '', address: '' });

  // 5. Simulación de la API (useEffect para obtener la lista de mascotas)
  useEffect(() => {
    fetch('https://huachitos.cl/api/animales')
      .then((res) => res.json())
      .then((data) => {
        // Asegúrate de que 'data' sea un arreglo antes de pasarlo a setPets
        if (Array.isArray(data)) {
          setPets(data);
        } else {
          console.error("La respuesta no es un arreglo", data);
          setPets([]); // Si no es un arreglo, lo dejamos como vacío para evitar errores
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la API", error);
        setPets([]); // En caso de error, inicializa como arreglo vacío
      });
  }, [filters]);

  // 6. Manejo del envío del formulario de adopción
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Solicitud enviada para adoptar a ${selectedPet.name} por ${adoptionData.name}`);
    setAdoptionData({ name: '', email: '', address: '' });
    setSelectedPet(null);
  };

  return (
    <div>
      <h1>Formulario de Adopción de Mascotas</h1>
      <Filters filters={filters} setFilters={setFilters} />
      {/* Valida que pets sea un arreglo antes de pasarle a PetList */}
      {Array.isArray(pets) && <PetList pets={pets} onSelectPet={setSelectedPet} />}
      {selectedPet && (
        <AdoptionForm
          selectedPet={selectedPet}
          adoptionData={adoptionData}
          setAdoptionData={setAdoptionData}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default App;
