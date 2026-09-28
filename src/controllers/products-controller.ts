import { Request, Response } from "express";
import { z } from "zod";

class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    response.send(`Página: ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string({ required_error: "Nome do produto é obrigatório!" })
        .trim()
        .min(3, {
          message: "Nome do produto deve ter pelo menos 3 caracteres!",
        }),
      price: z
        .number({ required_error: "Preço do produto é obrigatório!" })
        .positive({ message: "Preço do produto deve ser maior do que 0!" }),
    });

    const { name, price } = bodySchema.parse(request.body);

    response.status(201).json({ name, price, user_id: request.user_id });
  }
}

export { ProductsController };
