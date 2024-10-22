import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
// Create a new Sequelize instance using environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
});

// Function to authenticate and connect to the database
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL connected');

        // Synchronize models with the database
        // await sequelize.sync({ alter: true }); // Ensure tables are created if they don't exist

        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

// Export `sequelize` and `connectDB` as named exports
export { sequelize, connectDB };
