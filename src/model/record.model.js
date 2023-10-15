const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const Record = sequelize.define('records', {
    heartRate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bodyTemperature: {
        type: DataTypes.STRING,
        allowNull: false
    },
    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive', 'deleted'),
        defaultValue: 'active',
        allowNull: false,
        required: false
    }
}, {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'records',
});

(async() => {
    await sequelize.sync({ force: false });
})();

module.exports = Record;