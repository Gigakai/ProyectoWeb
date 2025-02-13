import {DataTypes, Model} from "sequelize";
import dbConnection from "../database.js";

class ReviewModel extends Model {
}

ReviewModel.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    texto:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    calificacion:{
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
    idPlatillo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: "platillos",
            key: 'id',
        }
    }
},{
    sequelize: dbConnection,
    modelName: "Comentario",
    timestamps: true,
})

export default ReviewModel
