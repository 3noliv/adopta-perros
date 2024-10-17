function PetList({ pets, onSelectPet }) {
  return (
    <div>
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} onSelectPet={onSelectPet} />
      ))}
    </div>
  );
}

function PetCard({ pet, onSelectPet }) {
  return (
    <div onClick={() => onSelectPet(pet)}>
      <img src={pet.imageUrl} alt={pet.name} />
      <h3>{pet.name}</h3>
      <p>Age: {pet.age}</p>
      {/* Otros detalles */}
    </div>
  );
}

export default PetList;