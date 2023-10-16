const sequelize = require("../config/db");
const { DataTypes } = require('sequelize');

const Patient = sequelize.define('patients', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nationalId: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    frequentSickness: {
        type: DataTypes.STRING,
        allowNull: false
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
    tableName: 'patients',
});

(async() => {
    await sequelize.sync({ force: false });
})();

module.exports = Patient;