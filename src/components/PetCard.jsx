import React from "react";

const PetCard = ({ pet, handleAdopt }) => {
  return (
    <div className="card">
      <img src={pet.imagen} alt={pet.nombre} />
      <h3>{pet.nombre}</h3>
      <p>Tipo: {pet.tipo}</p>
      <p>Estado: {pet.estado}</p>
      <p>Edad: {pet.edad}</p>
      <p>Género: {pet.genero}</p>
      <button onClick={() => handleAdopt(pet)}>Adoptar</button>
    </div>
  );
};

export default PetCard;
