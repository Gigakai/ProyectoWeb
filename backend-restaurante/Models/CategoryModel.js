import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class CategoryModel extends Model {
}

CategoryModel.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    sequelize: dbConnection,
    modelName: "Categoria",
    timestamps: true,
})

export default CategoryModel