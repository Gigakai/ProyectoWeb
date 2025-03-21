import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class ItemCategoryModel extends Model {}

ItemCategoryModel.init({
    idPlatillo:{
        type: DataTypes.INTEGER,
        references:{
            model: "platillos",
            key: 'id',
        },
        primaryKey: true
    },
    idCategoria:{
        type: DataTypes.INTEGER,
        references:{
            model: "categoria",
            key: 'id',
        },
        primaryKey: true
    }
},{
    sequelize: dbConnection,
    modelName: "PlatillosCategorias",
    timestamps: true,
})

export default ItemCategoryModel