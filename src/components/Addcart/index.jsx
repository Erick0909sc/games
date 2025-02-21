// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/redux/cart/cartSlice";

// const Addcart = ({ product }) => {
//   const dispatch = useDispatch();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const token = localStorage.getItem("token"); // Obtén el token del localStorage
//     if (token) {
//       try {
//         // Decodifica el token JWT
//         const decodedToken = JSON.parse(atob(token.split(".")[1]));
//         if (decodedToken && decodedToken.name) {
//           setUserName(decodedToken.name); // Asigna el nombre del usuario
//           setIsLoggedIn(true); // Establece que el usuario está logueado
//         }
//       } catch (error) {
//         console.error("Error decodificando el token:", error);
//       }
//     }
//   }, []);

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   if (!isLoggedIn) {
//     return null; // Si no está logueado, no muestra el botón
//   }

//   return (
//     <>
//       {/* Mostrar nombre de usuario si está logueado
//       <p className="text-lg font-bold">Hola, {userName}</p> */}

//       <button
//         onClick={handleAddToCart}
//         className="block w-full select-none rounded-lg bg-blue-600 py-3 px-6 text-center text-white font-bold uppercase transition-all hover:scale-105"
//       >
//         Añadir al Carrito
//       </button>
//     </>
//   );
// };

// export default Addcart;

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";

const Addcart = ({ product }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage
    // console.log("Token encontrado en localStorage:", token); // Depuración

    if (token) {
      try {
        // Decodifica el token JWT
        const payload = token.split(".")[1]; // Obtén la parte del payload
        const decodedPayload = atob(payload); // Decodifica la base64
        const decodedToken = JSON.parse(decodedPayload); // Convierte a objeto
        // console.log("Token decodificado:", decodedToken); // Depuración

        if (decodedToken && decodedToken.name) {
          setUserName(decodedToken.name); // Asigna el nombre del usuario
          setIsLoggedIn(true); // Establece que el usuario está logueado
          console.log("Usuario logueado con nombre:", decodedToken.name); // Depuración
        } else {
          console.log("El token no contiene un nombre de usuario válido."); // Depuración
        }
      } catch (error) {
        console.error("Error decodificando el token:", error);
        localStorage.removeItem("token"); // Elimina el token inválido
      }
    } else {
      console.log("No se encontró token en localStorage"); // Depuración
    }
  }, []);

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Debes iniciar sesión para añadir productos al carrito.");
      return;
    }

    const quantity = 1; // Establece un valor por defecto

    // Envía el producto con la cantidad al carrito
    dispatch(addToCart({ ...product, quantity }));
  };

  // if (!isLoggedIn) {
  //   console.log("Usuario no logueado, no se muestra el botón"); // Depuración
  //   return null; // Si no está logueado, no muestra el botón
  // }

  // console.log("Usuario logueado, mostrando botón"); // Depuración
  return (
    <>
      {/* Mostrar nombre de usuario si está logueado */}

      <button
        onClick={handleAddToCart}
        className="block w-full select-none rounded-lg bg-blue-600 py-3 px-6 text-center text-white font-bold uppercase transition-all hover:scale-105"
      >
        Añadir al Carrito
      </button>
    </>
  );
};

export default Addcart;
