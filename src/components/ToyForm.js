import React, { useState } from "react";
import axios from "axios";

function ToyForm({addToy}) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",

});

function handleChange(event) {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });

}

function handleSubmit(event) {
  event.preventDefault();

  const newToy = {
    name: formData.name,
    image: formData.image,
    likes: 0, // Initialize likes for the new toy
  };

  axios.post("http://localhost:3001/toys", newToy)
    .then((response) => {
      addToy(response.data); 
      setFormData({ name: "", image: "" }); // Clear the form inputs

    })

    .catch((error) => console.error("Error adding toy:", error));
    
}


  return (
    <div className="container">
      <form className="add-toy-form" onSubmit={handleSubmit}>
        <h3>Create a toy!</h3>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          type="text"
          name="image"
          onChange={handleChange}
          value={formData.image}
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
