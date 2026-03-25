import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../src/components/atoms/Button';
import { useAuth } from '../../src/context/AuthContext';

const WelcomeUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const userName = location.state?.name || user?.name || "Usuario";

  return (
    <div className="min-h-[70vh] bg-background flex flex-col items-center justify-center px-6 text-center font-inter">
      <div className="max-w-2xl">
        <h1 className="text-primary text-4xl md:text-5xl mb-6 font-play">
          ¡Bienvenido/a, <span className="italic">{userName}</span>! 
        </h1>
        
        <p className="text-primary opacity-80 mb-12 text-lg leading-relaxed">
          Tu registro se ha completado con éxito. ¿Qué te gustaría hacer ahora?
        </p>

        <div className="flex flex-row justify-center items-center gap-12 md:gap-20">
          <Button 
            variant="secondary" 
            onClick={() => navigate('/userdash')}
            className="px-8 py-3 min-w-[180px]" 
          >
            Mi Área Privada
          </Button>
          <Button 
            variant="primary" 
            onClick={() => navigate('/diagnostic')}
            className="px-8 py-3 min-w-[180px]"
          >
            Acceder al Formulario
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUserPage;