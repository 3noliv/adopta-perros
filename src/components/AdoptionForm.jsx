import React, { useState } from "react";
import "./AdoptionForm.css"; // Archivo CSS específico para el formulario

const AdoptionForm = ({ pet }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    console.log("Adoptando a:", pet.nombre);
  };

  // Verificación de si existe una mascota seleccionada
  if (!pet) {
    return <p>No has seleccionado ninguna mascota para adoptar.</p>;
  }

  return (
    <div className="adoption-form-container">
      <h2>Adoptar a {pet.nombre}</h2>
      <form onSubmit={handleSubmit} className="adoption-form">
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Dirección:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason">¿Por qué quieres adoptar?</label>
          <textarea
            name="reason"
            id="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
};

export default AdoptionForm;
