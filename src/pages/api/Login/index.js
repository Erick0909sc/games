import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Cambia bcrypt por bcryptjs
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Buscar el usuario
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Verificar la contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    // Generar un token JWT
    const token = jwt.sign(
      { userId: user.id, name: user.name }, // Incluye el nombre del usuario
      "secreto",
      { expiresIn: "1h" }
    );

    // Crear una sesión en la base de datos
    await prisma.session.create({
      data: {
        sessionToken: token,
        userId: user.id,
        expires: new Date(Date.now() + 3600 * 1000), // 1 hora
      },
    });

    return res.status(200).json({ message: "Login exitoso", token });
  }

  return res.status(405).json({ message: "Método no permitido" });
}
