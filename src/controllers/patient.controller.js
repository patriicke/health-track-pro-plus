const Patient = require("../model/patient.model");

const patientController = {
    createPatient: async(req, res) => {
        try {
            const { fullName, nationalId, frequentSickness } = req.body;
            const newPatient = await Patient.create({
                fullName,
                nationalId,
                frequentSickness
            });
            res.json({
                message: "Patient Created.",
                data: newPatient
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", data: null })
        }
    },
    getPatient: async(req, res) => {
        const { id } = req.params;

        const patient = await Patient.findOne({ where: { id } });

        if (!patient) {
            return res.status(404).json({ message: "Patient not found." });
        }

        res.json({
            message: "Patient retried.",
            data: patient
        });
    },
    getPatients: async(req, res) => {
        try {
            const patients = await Patient.findAll();
            res.json({
                message: "Patient retried.",
                data: patients
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", data: null })
        }
    },
    updatePatient: async(req, res) => {
        try {
            const { id } = req.params;

            const { fullName, nationalId, frequentSickness } = req.body;

            if (!fullName && !nationalId && !frequentSickness) {
                return res.status(400).json({ message: "No fields to update provided." });
            }

            const patient = await Patient.findByPk(id);

            if (!patient) {
                return res.status(404).json({ message: "Patient not found." });
            }

            if (fullName) {
                patient.fullName = fullName;
            }

            if (nationalId) {
                patient.nationalId = nationalId;
            }

            if (frequentSickness) {
                patient.frequentSickness = frequentSickness;
            }

            await patient.save();
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", data: null })

        }
    },
    deletePatient: async(req, res) => {
        try {
            const { id } = req.params;

            const patient = await Patient.findByPk(id);

            if (!patient) {
                return res.status(404).json({ message: "Patient not found." });
            }

            await Patient.update({ status: 'deleted' }, { where: { id } });
            res.json({
                message: "Patient deleted.",
            });
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error", data: null })
        }
    },
}

module.exports = patientController;