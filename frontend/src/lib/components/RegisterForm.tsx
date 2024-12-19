// Definición de los tipos de las propiedades que recibe el componente RegisterForm
interface RegisterFormProps {
  handleRegister: () => void; // Función para manejar el registro
  register: boolean; // Bandera para indicar si el registro está habilitado
  setEmail: (email: string) => void; // Función para actualizar el email
  setPassword: (password: string) => void; // Función para actualizar la contraseña
  setName: (name: string) => void; // Función para actualizar el nombre
  setSurname: (surname: string) => void; // Función para actualizar el apellido
  setRole?: (role: string) => void; // Función opcional para actualizar el rol
  email: string; // Valor del email
  password: string; // Valor de la contraseña
  name: string; // Valor del nombre
  surname: string; // Valor del apellido
  role?: string; // Valor del rol (opcional)
}

// Componente de formulario de registro
export const RegisterForm = ({
  handleRegister,
  register,
  setEmail,
  setPassword,
  setName,
  setSurname,
  setRole,
  email,
  password,
  name,
  surname,
  role,
}: RegisterFormProps) => {
  return (
    <>
      {/* Sección para el campo de Nombre */}
      <div className="w-full flex flex-col gap-2">
        <label className="font-semibold text-xs text-gray-400">Nombre</label>
        <input
          className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
          type="text"
          value={name}
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)} // Actualiza el estado del nombre
        />
      </div>

      {/* Sección para el campo de Apellidos */}
      <div className="w-full flex flex-col gap-2">
        <label className="font-semibold text-xs text-gray-400">Apellidos</label>
        <input
          className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
          type="text"
          value={surname}
          placeholder="Apellidos"
          onChange={(e) => setSurname(e.target.value)} // Actualiza el estado del apellido
        />
      </div>

      {/* Sección para el campo de Correo electrónico */}
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

      {/* Sección para el campo de Contraseña */}
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
            if (e.key === "Enter" && register) {
              // Si se presiona Enter, ejecuta la función de registro
              handleRegister();
            }
          }}
        />

        {/* Si se pasa la función setRole, cosa que solo podrá hacer el admin, muestra el campo para seleccionar un rol */}
        {setRole && (
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">Rol</label>
            <select
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              value={role}
              onChange={(e) => setRole(e.target.value)} // Actualiza el estado del rol
            >
              <option value="" disabled>
                Seleccione un rol
              </option>
              <option value="admin">Admin</option>
              <option value="teacher">Profesor</option>
              <option value="student">Estudiante</option>
            </select>
          </div>
        )}
      </div>
    </>
  );
};
