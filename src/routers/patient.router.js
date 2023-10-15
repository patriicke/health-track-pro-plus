const { Router } = require("express");

const patientRouter = Router();
const patientController = require("../controllers/patient.controller");

patientRouter.post("/", patientController.createPatient);
patientRouter.patch("/", patientController.updatePatient);
patientRouter.get("/", patientController.getPatients);
patientRouter.get("/:id", patientController.getPatient);
patientRouter.delete("/:id", patientController.deletePatient);


module.exports = patientRouter;