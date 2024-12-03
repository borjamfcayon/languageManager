import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo.webp';
import { Loader2 } from 'lucide-react';
import { useLogin } from '../../lib/api/AuthApi';
import { useQueryClient } from 'react-query';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading: loading } = useLogin();

  const handleSignIn = (email: string, password: string) => {
    setError(null);
    login({ email, password }, {
      onSuccess: (response) => {
        localStorage.setItem('token', response.token);
        queryClient.invalidateQueries('verifyToken');
        navigate('/private')
      },
      onError: (error) => {
        setError(error as string);
      }
    });
  };

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        background: `linear-gradient(to bottom, blue, white 30%)`,
        overflow: 'hidden',
      }}
    >
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-xl">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                <img src={Logo} className="sm:w-24 md:w-24" alt="Logo" />
              </a>
              <p className="m-0 text-[16px] font-semibold dark:text-white">Iniciar sesión</p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Hola Sapita, bienvenida a nuestro mundo de recuerdos.
              </span>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Correo electrónico</label>
              <input
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="font-semibold text-xs text-gray-400">Contraseña</label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSignIn(email, password);
                  }
                }}
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="mt-5">
              <button
                className="py-1 px-8 bg-blue-300 hover:bg-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
                onClick={() => handleSignIn(email, password)}
                disabled={loading}
              >
                {loading ? <Loader2 /> : 'INICIAR SESION'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
