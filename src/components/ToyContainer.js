import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({toys, onDelete, onUpdateLikes}) {
  
  return (
    <div id="toy-collection">
      {toys.map((toy) => (
      <ToyCard key={toy.id} toy={toy} onDelete={onDelete} onUpdateLikes={onUpdateLikes}/>
    ))}
    </div>
  );
}

export default ToyContainer;
