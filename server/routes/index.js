const { Router } = require("express");
const charactersRoutes = require("./characters.routes");

const router = Router();

router.use("/characters", charactersRoutes);

module.exports = router;
