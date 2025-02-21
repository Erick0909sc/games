import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router"; // Importa useRouter
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const router = useRouter(); // Inicializa el router

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("El nombre completo es obligatorio")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    email: Yup.string()
      .email("Ingresa un correo electrónico válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas deben coincidir")
      .required("Confirma tu contraseña"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch("/api/Register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success("Usuario registrado exitosamente, por favor espere he inicia sesión");
          formik.resetForm();

          // Redirigir al usuario a la página de Login después de 2 segundos
          setTimeout(() => {
            router.push("/Login"); // Redirige a la página de Login
          }, 1500); // Espera 2 segundos antes de redirigir
        } else {
          const data = await response.json();
          toast.error(data.message || "Error al registrar el usuario");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al conectar con el servidor");
      }
    },
  });

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formik.values.password);
  const getPasswordStrengthColor = (strength) => {
    if (strength < 50) return "red";
    if (strength < 75) return "yellow";
    return "green";
  };
  const getPasswordStrengthLabel = (strength) => {
    if (strength < 50) return "Débil";
    if (strength < 75) return "Intermedia";
    return "Fuerte";
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/duhzsygir/image/upload/v1739481405/videojuegos.webp)",
          filter: "blur(0px)",
        }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md"
          noValidate
        >
          <div className="w-full bg-white rounded-lg shadow border">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Registrate
              </p>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Nombre Completo
                </label>
                <input
                  placeholder=""
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Correo Electrónico
                </label>
                <input
                  placeholder="ejemplo@gmail.com"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="password"
                  name="password"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.password}
                  </p>
                ) : null}
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${passwordStrength}%`,
                        backgroundColor:
                          getPasswordStrengthColor(passwordStrength),
                      }}
                    ></div>
                  </div>
                  <p className="text-sm mt-1">
                    Seguridad de la contraseña:{" "}
                    <span
                      style={{
                        color: getPasswordStrengthColor(passwordStrength),
                      }}
                    >
                      {getPasswordStrengthLabel(passwordStrength)}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Confirmar Contraseña
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div className="flex items-start">
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-700">
                    Si ya tienes cuenta{" "}
                    <Link href="/Login" className="font-medium text-blue-600 ">
                      Haz click para loguearte
                    </Link>
                  </label>
                </div>
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-blue-800 text-white"
                type="submit"
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Index;
