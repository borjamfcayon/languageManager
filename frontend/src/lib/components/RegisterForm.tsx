interface RegisterFormProps {
  handleRegister: () => void;
  register: boolean;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setRole?: (role: string) => void;
  email: string;
  password: string;
  name: string;
  surname: string;
  role?: string;
}

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
      <div className="w-full flex flex-col gap-2">
        <label className="font-semibold text-xs text-gray-400">Nombre</label>
        <input
          className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
          type="text"
          value={name}
          placeholder="Nombre"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="font-semibold text-xs text-gray-400">Apellidos</label>
        <input
          className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
          type="text"
          value={surname}
          placeholder="Apellidos"
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="font-semibold text-xs text-gray-400">
          Correo electrónico
        </label>
        <input
          className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          onKeyDown={(e) => {
            if (e.key === "Enter" && register) {
              handleRegister();
            }
          }}
        />
        {setRole && (
          <div className="w-full flex flex-col gap-2">
            <label className="font-semibold text-xs text-gray-400">Rol</label>
            <select
              className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
