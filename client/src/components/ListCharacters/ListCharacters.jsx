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
      <h2>Your Characters</h2>
      <div className={style.card_container}>
        {characters.map((character) => (
          <article key={character.char_id} className={style.card}>
            <header>
              <h3>{character.name}</h3>
              <h4 className={style.level}>{character.level}</h4>
            </header>
            <img src={character.avatar} alt={character.name} />
            <footer>
              <div className={style.class_info}>
                <h4>{character.race}</h4>
                <p> - {character.char_class}</p>
              </div>
              <p className={style.atk_icon}>⚔</p>
            </footer>

            <div className={style.other_info}>
              <p>
                "Certainty of death, small chance of success... What are we
                waiting for?"
              </p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default ListCharacters;
