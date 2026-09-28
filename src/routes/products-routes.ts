import { Router } from "express";
import { myMiddleware } from "../middleware/my-middleware";
import { ProductsController } from "../controllers/products-controller";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", productsController.index);

// Middleware local em uma rota específica.
productsRoutes.post("/", myMiddleware, productsController.create);

export { productsRoutes };
