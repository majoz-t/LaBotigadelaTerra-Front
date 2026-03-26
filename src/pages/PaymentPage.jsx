import { useLocation, useNavigate } from "react-router-dom";
import PaymentForm from "../components/organisms/PaymentForm";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const formId = location.state?.formId;

  const handleSuccess = () => {
    console.log("Pago exitoso confirmado en la página, redirigiendo...");
    navigate("/successful", { replace: true });
  };

  if (!formId) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-orange-600">
          Error: No se encontró el diagnóstico.
        </h2>
        <p className="mt-4 text-[var(--color-primary)]">
          Por favor, vuelve al diagnóstico e inténtalo de nuevo.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">  
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-play text-center text-[var(--color-primary)] mb-12">
          Finalizar Pedido
        </h1>
        <PaymentForm formId={formId} onSuccess={handleSuccess} />
        <p className="text-center text-[10px] text-orange-500 italic mt-10">
          * Modo Simulación: No se guardarán datos reales de tarjetas ni se
          realizarán cobros.
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
