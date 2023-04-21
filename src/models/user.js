const Sequelize = require('sequelize');
const sequelize = require('../../database/connection');
module.exports = sequelize.define('User', {
    id:{
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    surname: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    last_name: {
        type: Sequelize.STRING(100),
        allowNull: true,
    },
    email: {
        type: Sequelize.STRING(300),
        unique: true
    },
    password: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    member_id: {
        type: Sequelize.STRING(11),
        allowNull: true,
    },
    user_type: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    address: {
        type: Sequelize.STRING(300),
        allowNull: true,
    },
    mobile_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
        unique: false
    },
    whatsapp_number: {
        type: Sequelize.STRING(15),
        allowNull: true,
        unique: false
    },
    dob: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    joining_date: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    monthly_amount: {
        type: Sequelize.STRING(20),
        allowNull: true,
    },
    added_by: {
        type: Sequelize.STRING(11),
        allowNull: true,
    },
    role_id: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    occupation: {
        type: Sequelize.STRING(30),
        allowNull: true,
    },
    profile_pic: {  
        type: Sequelize.STRING(),
        allowNull: true,
    },
    modified_by: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    status: {
        type: Sequelize.STRING(10),
        allowNull: true,
    },
    reference: {
        type: Sequelize.STRING(50),
        allowNull: true,
    },
    createdAt: Sequelize.DATE, 
    modifiedAt: Sequelize.DATE
});