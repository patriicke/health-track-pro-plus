const { Router } = require("express");
const welcomeRouter = require("./welcome.router");
const patientRouter = require("./patient.router");
const recordRouter = require("./record.router");

const router = Router();

router.use("/", welcomeRouter)
router.use("/patients", patientRouter)
router.use("/records", recordRouter)

module.exports = router;