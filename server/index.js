const express = require("express");
const cors = require("cors");
const { query } = require("./db");
const { v2: cloudinary } = require("cloudinary");

require("dotenv").config();

const app = express();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// create character
app.post("/characters", async (req, res) => {
  try {
    const { name, race, char_class, level, image_url } = req.body;
    const newCharacter = await query(
      "INSERT INTO characters (name, race, char_class, level, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, race, char_class, level, image_url]
    );

    res.json(newCharacter.rows[0]), console.log("New character: ", name);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get all characters
app.get("/characters", async (req, res) => {
  try {
    const allCharacters = await query("SELECT * FROM characters");
    res.json(allCharacters.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// get a character
app.get("/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const character = await query(
      "SELECT * FROM characters WHERE char_id = $1",
      [id]
    );
    res.json(character.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// update character
app.put("/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, race, char_class, level, image_url } = req.body;
    await query(
      "UPDATE characters SET name = $1, race = $2, char_class = $3, level = $4, image_url = $5 WHERE char_id = $6",
      [name, race, char_class, level, image_url, id]
    );
    res.json("Character was updated"), console.log(name, " has been updated");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// delete character
app.delete("/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await query("DELETE FROM characters WHERE char_id = $1", [id]);
    res.json("Character was deleted"), console.log(id, " has been deleted");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
