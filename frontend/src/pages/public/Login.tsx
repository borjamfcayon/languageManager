import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Logo.webp";
import { Loader2 } from "lucide-react";
import { ISignUpData, useLogin, useRegister } from "../../lib/api/AuthApi";
import { useQueryClient } from "react-query";
import { RegisterForm } from "../../lib/components/RegisterForm";

export const Login = () => {
  // Estado para almacenar el email, la contraseña, posibles errores,
  // y el estado del formulario (si está en modo de inicio de sesión o registro).
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  // Hooks de react-router-dom y react-query
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Mutaciones para login y registro utilizando react-query
  const { mutate: login, isLoading: loading } = useLogin();
  const { mutate: registerUser } = useRegister();

  // Función para manejar el inicio de sesión
  const handleSignIn = (email: string, password: string) => {
    // Restablece posibles errores previos
    setError(null);

    // Llama a la mutación para realizar el login
    login(
      { email, password },
      {
        onSuccess: (response) => {
          // Almacena el token en el localStorage y redirige al usuario
          localStorage.setItem("token", response.token);
          queryClient.invalidateQueries("verifyToken"); // Invalida cualquier consulta relacionada con el token
          navigate("/private"); // Navega a la página privada
        },
        onError: (error) => {
          // Si hay un error, establece el mensaje en el estado de error
          setError(error as string);
        },
      }
    );
  };

  // Función para manejar el registro del usuario
  const handleRegister = () => {
    setError(null);

    // Crea un objeto de datos del usuario para el registro
    const newUser: ISignUpData = {
      email: email,
      password: password,
      name: name,
      surname: surname,
      mainLanguage: "es", // Idioma principal
      role: "student", // Rol del usuario
      class: [], // Lista de clases (vacío inicialmente)
    };

    // Llama a la mutación para registrar al usuario
    registerUser(newUser, {
      onSuccess: () => {
        // Después de registrar al usuario, se inicia sesión automáticamente
        handleSignIn(email, password);
        queryClient.invalidateQueries("verifyToken");
      },
    });
  };

  return (
    // Contenedor principal con estilos de fondo
    <div
      className="w-screen min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(to bottom, blue, white 30%)`, // Fondo con gradiente
        overflow: "hidden",
      }}
    >
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-xl">
          <div className="flex flex-col justify-center items-center h-full select-none">
            {/* Sección de logo y mensaje de bienvenida */}
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <a
                href="https://amethgalarcio.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={Logo} className="sm:w-24 md:w-24" alt="Logo" />
              </a>
              <p className="m-0 text-[16px] font-semibold dark:text-white">
                Iniciar sesión
              </p>
              {/* Enlace para cambiar entre el formulario de login y el de registro */}
              {!register ? (
                <p
                  className="text-xs text-gray-400 dark:text-gray-300 cursor-pointer hover:text-blue-400"
                  onClick={() => setRegister(true)} // Cambia el estado para mostrar el formulario de registro
                >
                  Regístrate en la plataforma
                </p>
              ) : (
                <p
                  className="text-xs text-gray-400 dark:text-gray-300 cursor-pointer hover:text-blue-400"
                  onClick={() => setRegister(false)} // Cambia el estado para mostrar el formulario de login
                >
                  Ingresa a tu cuenta
                </p>
              )}
            </div>
            {/* Renderiza el formulario de inicio de sesión o el de registro dependiendo del estado */}
            {!register ? (
              <>
                {/* Formulario de inicio de sesión */}
                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-400">
                    Correo electrónico
                  </label>
                  <input
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado del email
                    placeholder="Correo electrónico"
                  />
                </div>
                <div className="w-full flex flex-col gap-2">
                  <label className="font-semibold text-xs text-gray-400">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado de la contraseña
                    placeholder="••••••••"
                    onKeyDown={(e) => {
                      // Al presionar Enter, realiza el inicio de sesión
                      if (e.key === "Enter" && !register) {
                        handleSignIn(email, password);
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              // Si el usuario está registrándose, se muestra el formulario de registro
              <RegisterForm
                handleRegister={handleRegister}
                register={register}
                setEmail={setEmail}
                setPassword={setPassword}
                setName={setName}
                setSurname={setSurname}
                email={email}
                password={password}
                name={name}
                surname={surname}
              />
            )}

            {/* Muestra un mensaje de error si hay alguno */}
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="mt-5">
              {/* Botón para iniciar sesión o registrarse */}
              <button
                className="py-1 px-8 bg-blue-300 hover:bg-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                onClick={() =>
                  !register ? handleSignIn(email, password) : handleRegister()
                }
                disabled={loading} // Desactiva el botón mientras se está procesando la solicitud
              >
                {/* Muestra un loader mientras la mutación está en progreso */}
                {loading ? (
                  <Loader2 />
                ) : !register ? (
                  "INICIAR SESION"
                ) : (
                  "REGISTRARSE"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
