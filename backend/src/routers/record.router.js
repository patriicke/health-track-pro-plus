const { Router } = require("express");
const recordController = require("../controllers/record.controller");

const recordRouter = Router();

recordRouter.post("/", recordController.createRecord);
recordRouter.patch("/", recordController.updateRecord);
recordRouter.get("/", recordController.getRecords);
recordRouter.get("/:id", recordController.getRecord);
recordRouter.delete("/:id", recordController.deleteRecord);


module.exports = recordRouter;