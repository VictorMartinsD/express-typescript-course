import { Request, Response } from "express";
import { AppError } from "../utils/app-error";

class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    response.send(`Página: ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const { name, price } = request.body;

    if (!name) {
      throw new AppError("Nome do produto é obrigatório!");
    }

    if (name.trim().length < 3) {
      throw new AppError("Nome do produto deve ter pelo menos 3 caracteres!");
    }

    if (!price) {
      throw new AppError("Preço do produto é obrigatório!");
    }

    if (price < 0) {
      throw new AppError("Preço do produto não pode ser menor do que 0!");
    }

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}

export { ProductsController };
