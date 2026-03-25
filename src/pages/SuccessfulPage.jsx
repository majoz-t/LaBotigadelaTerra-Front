import { useNavigate } from "react-router-dom";
import Button from "../components/atoms/Button";
import { CheckCircle } from "lucide-react";

const SuccessfulPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <main className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <div className="mb-8 text-[var(--color-primary)] animate-bounce">
          <CheckCircle size={80} strokeWidth={1.5} />
        </div>
        <h1 className="text-4xl font-play text-[var(--color-primary)] mb-6">
          ¡Gracias por tu confianza!
        </h1>
        <div className="max-w-md space-y-4">
          <p className="text-lg text-[var(--color-primary)] opacity-80 leading-relaxed">
            Tu solicitud ha sido procesada correctamente.
          </p> 
          <p className="text-[var(--color-primary)] font-medium">
            En las próximas <span className="text-[var(--color-primary)] font-bold">72 hs hábiles</span> recibirás tu diagnóstico inicial en tu correo electrónico.
          </p>
        </div>
        <div className="mt-12">
          <Button 
            variant="primary" 
            onClick={() => navigate("/")}
            className="px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Volver al Inicio
          </Button>
        </div>
        <p className="mt-20 text-xs text-[var(--color-border-button)] italic">
          • La Botiga de la Terra •
        </p>
      </main>
    </div>
  );
};

export default SuccessfulPage;