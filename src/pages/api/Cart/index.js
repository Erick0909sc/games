import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { userId, productId, quantity } = req.body;

  try {
    switch (req.method) {
      case "GET":
        const cart = await prisma.cart.findUnique({
          where: { userId: parseInt(userId) },
          include: { items: true },
        });
        res.status(200).json(cart ? cart.items : []);
        break;

      case "POST":
        // Validar que los datos sean números válidos
        if (isNaN(userId)) {
          return res.status(400).json({ error: "userId debe ser un número válido" });
        }
        if (isNaN(productId)) {
          return res.status(400).json({ error: "productId debe ser un número válido" });
        }
        if (isNaN(quantity)) {
          return res.status(400).json({ error: "quantity debe ser un número válido" });
        }

        // Verificar si el usuario y el producto existen
        const userExists = await prisma.user.findUnique({
          where: { id: parseInt(userId) },
        });
        if (!userExists) {
          return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const productExists = await prisma.product.findUnique({
          where: { id: parseInt(productId) },
        });
        if (!productExists) {
          return res.status(404).json({ error: "Producto no encontrado" });
        }

        // Crear o actualizar el carrito
        const updatedCart = await prisma.cart.upsert({
          where: { userId: parseInt(userId) },
          update: {
            items: {
              upsert: {
                where: {
                  cartId_productId: {
                    cartId: parseInt(userId),
                    productId: parseInt(productId),
                  },
                },
                create: {
                  productId: parseInt(productId),
                  quantity: parseInt(quantity),
                },
                update: { quantity: { increment: parseInt(quantity) } },
              },
            },
          },
          create: {
            userId: parseInt(userId),
            items: {
              create: {
                productId: parseInt(productId),
                quantity: parseInt(quantity),
              },
            },
          },
        });

        res.status(200).json(updatedCart.items);
        break;

      case "DELETE":
        await prisma.cartItem.deleteMany({
          where: { cartId: parseInt(userId), productId: parseInt(productId) },
        });
        res.status(200).json({ productId: parseInt(productId) });
        break;

      default:
        res.setHeader("Allow", ["GET", "POST", "DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error("Error en la API /api/Cart:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}