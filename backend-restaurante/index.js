import express from "express";
import UsuarioRouter from './Routes/UserRoutes.js';
import ReviewRouter from './Routes/ReviewRoutes.js';
import CategoryRouter from './Routes/CategoryRoutes.js';
import PaymentRouter from './Routes/PaymentRoutes.js';
import OrderRouter from './Routes/OrderRoutes.js';
import ItemRouter from './Routes/ItemRoutes.js';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use("/api/users", UsuarioRouter)
app.use("/api/categories", CategoryRouter)
app.use("/api/items", ItemRouter)
app.use("/api/orders", OrderRouter)
app.use("/api/payments", PaymentRouter)
app.use("/api/reviews", ReviewRouter)

app.listen(port, () => { console.log(`Server started on port ${port}`); });