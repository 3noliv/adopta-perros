function AdoptionForm({
  selectedPet,
  adoptionData,
  setAdoptionData,
  onSubmit,
}) {
  const handleInputChange = (e) => {
    setAdoptionData({ ...adoptionData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Adopt {selectedPet.name}</h2>
      <input
        name="name"
        placeholder="Your Name"
        value={adoptionData.name}
        onChange={handleInputChange}
      />
      {/* Otros campos como email, dirección, etc. */}
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdoptionForm;