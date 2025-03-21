import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class ItemOrderModel extends Model {}

ItemOrderModel.init({
    idPlatillo:{
        type: DataTypes.INTEGER,
        references:{
            model: "platillos",
            key: 'id',
        },
        primaryKey: true
    },
    idPedido:{
        type: DataTypes.INTEGER,
        references:{
            model: "pedidos",
            key: 'id',
        },
        primaryKey: true
    },
    cantidad:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precioUnitario:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    }
},{
    sequelize: dbConnection,
    modelName: "PlatillosPedidos",
    timestamps: true,
})

export default ItemOrderModel