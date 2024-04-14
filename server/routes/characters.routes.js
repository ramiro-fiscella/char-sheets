const { Router } = require("express");
const router = Router();
const charactersController = require("../controllers/charactersControllers");

router.post("/", charactersController.createCharacter);
router.get("/", charactersController.getCharacters);
router.get("/:id", charactersController.getCharacterById);
router.put("/:id", charactersController.updateCharacter);
router.delete("/:id", charactersController.deleteCharacter);

module.exports = router;
