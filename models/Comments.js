import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    commentedBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    commentedOn: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, { timestamps: true });

export default Comment;
