const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
    res.send("HVAC Estimate API is running");
});

router.use((req, res) => {
    return res.send("Not a valid route!");
});

module.exports = router;