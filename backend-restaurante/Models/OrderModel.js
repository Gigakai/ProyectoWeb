import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class OrderModel extends Model {
}

OrderModel.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estatus:{
        type: DataTypes.CHAR,
        allowNull: false,
    },
    idUsuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "usuarios",
            key: 'id',
        }
    },
    direccion:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: dbConnection,
    modelName: "Pedido",
    timestamps: true,
})

export default OrderModel