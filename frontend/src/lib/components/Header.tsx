import Logo from '../../assets/Logo.webp';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate()

    return (
        <div className="h-28 w-screen bg-[#FF1493] p-4 flex justify-between md:justify-start items-center md:gap-12 shadow-lg">
            <div className='p-2 rounded-md hover:filter hover:drop-shadow-2xl hover:drop-shadow-[0_4px_6px_#FFCCCC] cursor-pointer' onClick={() => navigate('/private')}>
                <img src={Logo} alt="Letras" className="w-20" />
            </div>
            <div className="p-2 cursor-pointer text-2xl text-[#FFB6C1] hover:text-[#FFF0F5]" onClick={() => navigate('/private/levels')}>
                NIVELES
            </div>
            <div className="p-2 cursor-pointer text-2xl text-[#FFB6C1] hover:text-[#FFF0F5]" onClick={() => navigate('/private/rewards')}>
                RECOMPENSAS
            </div>
        </div>
    );
}