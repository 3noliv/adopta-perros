import React from "react";
import PetCard from "./PetCard"; // Asegúrate de importar PetCard

const PetList = ({ pets, handleAdopt }) => {
  return (
    <div className="container">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} handleAdopt={handleAdopt} /> // Asegúrate de que PetCard esté correctamente referenciado
      ))}
    </div>
  );
};

export default PetList;
