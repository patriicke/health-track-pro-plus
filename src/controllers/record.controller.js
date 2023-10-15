const Record = require("../model/record.model");

const recordController = {
    createRecord: async(req, res) => {
        try {
            const { heartRate, bodyTemperature, patientId } = req.body;
            const newRecord = await Record.create({
                heartRate,
                bodyTemperature,
                patientId
            });
            res.json({
                message: "Record Created.",
                data: newRecord
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error: " + error.message, data: null })
        }
    },
    getRecords: async(req, res) => {
        try {
            const records = await Record.findAll();
            res.json({
                message: "Records retried.",
                data: records
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error: " + error.message, data: null })
        }
    },
    getRecord: (req, res) => {
        res.json({
            message: "Get a single record.",
        });
    },
    updateRecord: (req, res) => {
        res.json({
            message: "Update a record.",
        });
    },
    deleteRecord: (req, res) => {
        res.json({
            message: "Delete a record.",
        });
    },
}

module.exports = recordController;