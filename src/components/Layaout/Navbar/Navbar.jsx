"use client";
import { useState, useEffect } from "react";
import Link from "next/link"; // Importa Link de next/link

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para saber si el usuario está logueado
  const [userName, setUserName] = useState(""); // Estado para almacenar el nombre del usuario
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Estado para controlar el menú desplegable

  // Simula la verificación del usuario logueado (esto debería venir del backend o del token)
  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage
    if (token) {
      try {
        // Decodifica el token JWT
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken && decodedToken.name) {
          setUserName(decodedToken.name); // Asigna el nombre del usuario
          setIsLoggedIn(true); // Establece que el usuario está logueado
        }
      } catch (error) {
        console.error("Error decodificando el token:", error);
      }
    }
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token"); // Elimina el token del localStorage
    setIsLoggedIn(false); // Actualiza el estado de logueo
    setUserName(""); // Limpia el nombre del usuario
    setIsDropdownOpen(false); // Cierra el menú desplegable
  };

  // Función para ver el carrito
  const handleViewCart = () => {
    setIsDropdownOpen(false); // Cierra el menú desplegable
    // Aquí puedes agregar la lógica para redirigir al carrito
    console.log("Ver carrito");
  };

  // Navigation items array
  const navItems = [
    { name: "Inicio", href: "/home" }, // Usa rutas relativas
    { name: "Productos", href: "/productos" },
    // { name: "Concocenos", href: "/concocenos" },
    ...(isLoggedIn ? [{ name: "Carrito", href: "/carrito" }] : []),
    { name: "Registrate", href: "/Registro" },
  ];

  return (
    <div>
      <nav className="block w-full max-w-screen px-4 py-4 mx-auto bg-sky-800 bg-opacity-90 sticky top-3 shadow lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
        <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
          {/* Logo */}
          <Link
            href="/home" // Ruta a la página de inicio
            className=" font-black r-4 block cursor-pointer py-1.5 text-black hover:text-slate-600 text-2xl"
          >
            Games Room
          </Link>

          {/* Botón para menú móvil */}
          <div className="lg:hidden">
            <button
              className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              onClick={toggleMobileMenu}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 min-h-screen w-64 bg-slate-100 shadow-lg transform transition-transform duration-300 ease-in-out ${
              isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            } lg:hidden z-50`}
          >
            <div className="flex flex-row items-center border-b pb-4">
              <Link
                href="/home" // Ruta a la página de inicio
                className="cursor-pointer text-black hover:text-slate-600 font-bold text-xl pt-4 ps-4"
              >
                Games Thornes
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="absolute top-4 right-4 text-slate-600 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <ul className="flex flex-col h-full gap-4 p-4">
              {navItems
                .filter((item) => !isLoggedIn || item.name !== "Registrate") // Filtra "Registrate" si está logueado
                .map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2 text-black"
                  >
                    <Link href={item.href} className="flex items-center">
                      <span onClick={toggleMobileMenu}>{item.name}</span>
                    </Link>
                  </li>
                ))}

              {/* Mostrar el nombre de usuario si está logueado */}
              {isLoggedIn && (
                <>
                  <li className="flex items-center p-1 text-lg gap-x-2 text-black font-bold">
                    {userName}
                  </li>
                  {/* Botón para cerrar sesión en modo móvil */}
                  <li className="flex items-center p-1 text-lg gap-x-2 text-black">
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu(); // Cierra el menú después de cerrar sesión
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
              {navItems
                .filter((item) => !isLoggedIn || item.name !== "Registrate") // Filtra "Registrate" si el usuario está logueado
                .map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center p-1 text-lg gap-x-2 text-black hover:text-slate-200"
                  >
                    <Link
                      href={item.href} // Usa el href de cada item
                      className="flex items-center"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              {isLoggedIn && ( // Muestra el nombre del usuario si está logueado
                <li className="flex items-center p-1 text-lg gap-x-2 text-black relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center font-bold"
                  >
                    {userName}
                  </button>
                  {/* Menú desplegable */}
                  {isDropdownOpen && (
                    <div className="absolute top-10 right-0 bg-white rounded-lg shadow-lg z-50">
                      <ul className="py-2">
                        <li>
                          <button
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            Cerrar sesión
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
