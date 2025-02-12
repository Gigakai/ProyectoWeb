import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class UserModel extends Model {
}

UserModel.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    avatar:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.CHAR,
        allowNull: false,
    }
}, {
    sequelize: dbConnection,
    modelName: "Usuario",
    timestamps: true,
})

export default UserModel