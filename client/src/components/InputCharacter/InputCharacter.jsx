import React, { useState } from "react";
import style from "./InputCharacter.module.css";

const InputCharacter = () => {
  const [newCharacter, setNewCharacter] = useState({
    name: "",
    race: "",
    char_class: "",
    level: 0,
    image_url: null,
  });

  const handleChange = (e) => {
    setNewCharacter({ ...newCharacter, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewCharacter({ ...newCharacter, image: file });
  };

  const onSubmitNewCharacter = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newCharacter.name);
      formData.append("race", newCharacter.race);
      formData.append("char_class", newCharacter.char_class);
      formData.append("level", newCharacter.level);
      formData.append("image", newCharacter.image);

      await fetch("http://localhost:5000/characters", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Character created");
        window.location = "/";
      } else {
        alert("Cannot create character");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <h2>Create a new character</h2>

      <form onSubmit={onSubmitNewCharacter}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={newCharacter.name}
          onChange={handleChange}
          required
          autoFocus
          placeholder="Name"
        />
        <label htmlFor="race">Race</label>
        <input
          type="text"
          name="race"
          id="race"
          value={newCharacter.race}
          onChange={handleChange}
          required
          placeholder="Race"
        />
        <label htmlFor="char_class">Class</label>
        <input
          type="text"
          name="char_class"
          id="char_class"
          value={newCharacter.char_class}
          onChange={handleChange}
          required
          placeholder="Class"
        />
        <label htmlFor="level">Level</label>
        <input
          type="number"
          name="level"
          id="level"
          value={newCharacter.level}
          onChange={handleChange}
          required
        />
        <label htmlFor="image">Image</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          id="image"
          onChange={handleImageChange}
        />

        <button>Create Character</button>
      </form>
    </>
  );
};

export default InputCharacter;
