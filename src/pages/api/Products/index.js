import prisma from "@/prisma/prisma";
import games from "@/Data/products";

export default async function handler(req, res) {
  const { method } = req;
  const { name, category, price } = req.query;

  switch (method) {
    case "POST":
      try {
        const existingProducts = await prisma.product.findMany();

        if (!existingProducts.length) {
          const products = await prisma.product.createMany({
            data: games,
          });

          return res.status(201).json({ products });
        } else {
          return res.status(200).json({ existingProducts });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "GET":
      try {
        if (name) {
          const productsByName = await prisma.product.findMany({
            where: {
              name: {
                contains: name,
                mode: "insensitive",
              },
              disabled: false,
            },
          });

          if (productsByName.length === 0) {
            return res
              .status(404)
              .json({ error: "El producto que está buscando no existe" });
          }

          return res.status(200).json({ productsByName });
        } else if (category) {
          const productsByCategory = await prisma.product.findMany({
            where: {
              category: category,
            },
          });
          if (productsByCategory.length === 0) {
            return res
              .status(404)
              .json({ error: "La categoría que busca no existe" });
          }

          return res.status(200).json({ productsByCategory });
        } else if (price) {
          const productsByPrice = await prisma.product.findMany({
            where: { price: parseFloat(price) },
          });

          return res.status(200).json({ productsByPrice });
        } else {
          const allProducts = await prisma.product.findMany({
            where: {
              category: category,
            },
          });

          return res.status(200).json(allProducts);
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(500).json({ error: "fallo" });
      break;
  }
}
