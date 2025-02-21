import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css"; // Importa los estilos

const Index = () => {
  // Esquema de validación con Yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
  });

  // Configuración de Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/Login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message); // Muestra un mensaje de éxito con toast
          // Guarda el token en localStorage o en cookies
          localStorage.setItem("token", data.token);
          // Redirige al usuario a otra página (opcional)
          window.location.href = "/home";
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Error al iniciar sesión"); // Muestra un mensaje de error con toast
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al conectar con el servidor"); // Muestra un mensaje de error con toast
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Logueate con tu cuenta
        </h2>
        <form onSubmit={formik.handleSubmit} className="flex flex-col">
          {/* Campo de correo electrónico */}
          <div className="mb-4">
            <input
              type="email"
              name="email"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Correo electrónico"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            ) : null}
          </div>

          {/* Campo de contraseña */}
          <div className="mb-4">
            <input
              type="password"
              name="password"
              className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 w-full focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Contraseña"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            ) : null}
          </div>

          {/* Enlace de olvidé mi contraseña */}
          <div className="flex items-center justify-between flex-wrap mb-4">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          >
            Ingresar
          </button>

          {/* Enlace para registrarse */}
          <p className="text-gray-900 mt-4">
            ¿No tienes una cuenta?{" "}
            <Link
              href="/Registro"
              className="text-sm text-blue-500 hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </form>
      </div>
      {/* Contenedor de notificaciones */}
      <ToastContainer
        position="top-right" // Posición de las notificaciones
        autoClose={5000} // Duración de las notificaciones (5 segundos)
        hideProgressBar={false} // Muestra la barra de progreso
        newestOnTop={false} // Las nuevas notificaciones aparecen debajo
        closeOnClick // Cierra la notificación al hacer clic
        rtl={false} // No usar diseño de derecha a izquierda
        pauseOnFocusLoss // Pausa la notificación si la ventana pierde el foco
        draggable // Permite arrastrar la notificación
        pauseOnHover // Pausa la notificación al pasar el mouse
      />
    </div>
  );
};

export default Index;
