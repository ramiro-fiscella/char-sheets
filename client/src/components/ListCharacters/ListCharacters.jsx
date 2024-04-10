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
      <div className={style.card_container}>
        {characters.map((character) => (
          <article key={character.char_id} className={style.card}>
            <header>
              <h3>{character.name}</h3>
              <h4>{character.level}</h4>
            </header>
            <img src={character.avatar} alt={character.name} />
            <footer>
              <h4>{character.race}</h4>
              <p>Class: {character.char_class}</p>
            </footer>
          </article>
        ))}
      </div>
    </>
  );
}

export default ListCharacters;
