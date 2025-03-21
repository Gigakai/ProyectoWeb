import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";
import CategoryModel from "./CategoryModel.js";
import ItemCategoryModel from "./ItemCategoryModel.js";

class ItemModel extends Model {
}

ItemModel.init({
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
    },
    precio:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    estatus:{
        type: DataTypes.CHAR,
        allowNull: false,
    }
},{
    sequelize: dbConnection,
    modelName: "Platillo",
    timestamps: true,
})

export default ItemModel