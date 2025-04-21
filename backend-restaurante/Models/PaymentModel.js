import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class PaymentModel extends Model {
}

PaymentModel.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo:{
        type: DataTypes.CHAR,
        allowNull: false,
    },
    ultimosDigitos:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    fechaVencimiento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idOwner:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "usuarios",
            key: 'id',
        }
    },
    idOrder:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "pedidos",
            key: 'id',
        }
    }
},{
    sequelize: dbConnection,
    modelName: "Metodo",
    timestamps: true,
})

export default PaymentModel