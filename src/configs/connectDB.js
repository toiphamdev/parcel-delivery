const { Sequelize } = require('sequelize');
require('dotenv').config();

// Option 3: Passing parameters separately (other dialects)
let connectDB = async()=>{
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER_NAME, process.env.DB_USER_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
        query:{
            raw: true
        },
        timezone:"+07:00",
        dialectOptions:{
        ssl:{
            require:true,
            rejectUnauthorized:false
        }
        }
    });
    try {
    await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;