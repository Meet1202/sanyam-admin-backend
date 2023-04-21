const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
module.exports = sequelize.define('Amount', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    volunteer_id: {
        type: Sequelize.INTEGER(100),
        allowNull: false,
    },   
    member_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    payment_date: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    amount: {
        type: Sequelize.INTEGER(20),
        allowNull: false,
    },
    createdAt: Sequelize.DATE,
    modifiedAt: Sequelize.DATE 
});