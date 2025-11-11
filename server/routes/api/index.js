const router = require("express").Router();
const estimateRoutes = require("./estimateRoutes");

router.use("/estimates", estimateRoutes);

module.exports = router;
