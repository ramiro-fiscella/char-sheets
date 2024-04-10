const express = require("express");
const app = express();
const cors = require("cors");
const { query } = require("./db");
const { v2: cloudinary } = require("cloudinary");
const multer = require("multer");

require("dotenv").config();

// Cloudinary Config
cloudinary.config({
  cloud_name: "dsrohvpsm",
  api_key: "655745591195891",
  api_secret: "BG9JKtz4PEVCNcuO4I91C-6FXnw",
});

// Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  // Obterner nombre personaje y tipo de imagen para optimizar nombre de carga
  filename: (req, file, cb) => {
    const characterName = req.body.name; // Obtener el nombre del personaje desde la solicitud (requiere que el campo 'name' esté presente en la solicitud)
    const timestamp = Date.now();
    const extension = file.originalname.split(".").pop(); // Obtener la extensión del archivo original
    const filename = `${characterName}_${timestamp}.${extension}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG/JPG/PNG is allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
  fileFilter: fileFilter,
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes

// create character
app.post("/characters", upload.single("image"), async (req, res) => {
  try {
    const { name, race, char_class, level } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `avatar/${req.file.filename}`,
    });

    const imageUrl = result.secure_url;
    const avatar = imageUrl;

    const newCharacter = await query(
      "INSERT INTO characters (name, race, char_class, level, avatar) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, race, char_class, level, avatar]
    );

    res.json(newCharacter.rows[0]), console.log("New character:", name);
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
    const { name, race, char_class, level, avatar } = req.body;
    await query(
      "UPDATE characters SET name = $1, race = $2, char_class = $3, level = $4, avatar = $5 WHERE char_id = $6",
      [name, race, char_class, level, avatar, id]
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
