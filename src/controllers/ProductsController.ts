import { Request, Response } from "express";

class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    response.send(`Página: ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const { name, price } = request.body;

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}

export { ProductsController };
