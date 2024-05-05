import React, { useState, useEffect } from "react";
import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";
import axios from "axios";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(() => {
    axios
    .get("http://localhost:3001/toys")
    .then((response) => setToys(response.data))
    .catch((error) => console.error("Error fetching toys:", error));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    setToys([...toys, newToy])
  }

  function deleteToy(id) {
    axios.delete(`http://localhost:3001/toys/${id}`)
      .then(() => {
        const updatedToys = toys.filter((toy) => toy.id !== id);
        setToys(updatedToys);
      })
      .catch((error) => console.error("Error deleting toy:", error));
  }

  function updateLikes(id, newLikes) {
    axios.patch(`http://localhost:3001/toys/${id}`, { likes: newLikes })
      .then(() => {
        const updatedToys = toys.map((toy) => {
          if (toy.id === id) {
            return { ...toy, likes: newLikes };
          }
          return toy;
        });
        setToys(updatedToys);
      })
      .catch((error) => console.error("Error updating likes:", error));
  }


  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDelete={deleteToy} onUpdateLikes={updateLikes}/>
    </>
  );
}

export default App;
