import prisma from "@/prisma/prisma";

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  switch (method) {
    case "GET":
      try {
        const product = await prisma.product.findUnique({
          where: { id: parseInt(id) },
        });

        if (!product) {
          return res.status(404).json({ error: "El producto no existe" });
        }

        return res.status(200).json({ product });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    default:
      res.status(500).json({ error: "Fallo" });
      break;
  }
}
