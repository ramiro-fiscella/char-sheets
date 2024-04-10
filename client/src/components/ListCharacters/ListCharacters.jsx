import React, { useState, useEffect } from "react";
import style from "./ListCharacters.module.css";

function ListCharacters() {
  const [characters, setCharacters] = useState([]);

  const getCharacters = async () => {
    try {
      const response = await fetch("http://localhost:5000/characters");
      const jsonData = await response.json();
      setCharacters(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return (
    <>
      <h2>ListCharacters</h2>
      <div className={style.list_container}>
        {characters.map((character) => (
          <div key={character.char_id} className={style.list}>
            <img src={character.image_url} alt={character.name} />
            <h3>{character.name}</h3>
            <p>Race: {character.race}</p>
            <p>Class: {character.char_class}</p>
            <p>Level: {character.level}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ListCharacters;
