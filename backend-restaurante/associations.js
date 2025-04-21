import ItemModel from "./Models/ItemModel.js";
import CategoryModel from "./Models/CategoryModel.js";
import ItemCategoryModel from "./Models/ItemCategoryModel.js";
import ReviewModel from "./Models/ReviewModel.js";
import UserModel from "./Models/UserModel.js";
import OrderModel from "./Models/OrderModel.js";
import ItemOrderModel from "./Models/ItemOrderModel.js";
import PaymentModel from "./Models/PaymentModel.js";

ItemModel.belongsToMany(CategoryModel, {
    through: ItemCategoryModel,
    foreignKey: "idPlatillo",
    otherKey: "idCategoria",
});

CategoryModel.belongsToMany(ItemModel, {
    through: ItemCategoryModel,
    foreignKey: "idCategoria",
    otherKey: "idPlatillo",
});

ReviewModel.belongsTo(UserModel,{
    foreignKey: "idUsuario"
})

UserModel.hasMany(ReviewModel, {
    foreignKey: "idUsuario",
})

OrderModel.hasMany(ItemOrderModel, { foreignKey: "idPedido" });
ItemOrderModel.belongsTo(OrderModel, { foreignKey: "idPedido" });

ItemModel.hasMany(ItemOrderModel, { foreignKey: "idPlatillo" });
ItemOrderModel.belongsTo(ItemModel, { foreignKey: "idPlatillo" });

OrderModel.hasOne(PaymentModel, { foreignKey: 'idOrder' });
PaymentModel.belongsTo(OrderModel, { foreignKey: 'idOrder' });

export default { ItemModel, CategoryModel, ItemCategoryModel, OrderModel, ItemOrderModel, PaymentModel };