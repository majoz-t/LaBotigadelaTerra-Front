import { useState } from "react";
import { diagnosticFormService } from "../../services/diagnosticFormService";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";

const PaymentForm = ({ formId, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFakeSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing || !formId) return;
    setIsProcessing(true);
    console.log(`Iniciando simulación de pago para formId: ${formId}`);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const response = await diagnosticFormService.confirmFakePayment(formId);
      onSuccess();
    } catch (error) {
      console.error("Error en la simulación de pago:", error);
      alert("Hubo un error al procesar el pago simulado. Revisa la consola.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
 <form onSubmit={handleFakeSubmit} className="max-w-[450px] mx-auto p-8 gap-4 rounded-[25px] bg-[var(--color-background-form)] border-[3px] border-[var(--color-border-form)]">
  <div className="flex flex-col">
    <FormField label="Número de tarjeta">
      <Input 
        type="text" 
        placeholder="XXXX XXXX XXXX XXXX" 
        disabled 
        className="bg-white rounded-[25px]" 
      />
    </FormField>
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Fecha caducidad">
        <Input 
          type="text" 
          placeholder="MM/AA" 
          disabled 
        />
      </FormField>
      <FormField label="CCV">
        <Input 
          type="text" 
          placeholder="000" 
          disabled 
        />
      </FormField>
    </div>
    <div className="flex flex-col items-center gap-3 mt-6">
      <Button
        type="submit"
        disabled={isProcessing}
        variant="primary"
      >
        {isProcessing ? "Procesando..." : "Pagar"}
      </Button>
      {isProcessing && (
        <p className="text-sm text-[var(--color-primary)] opacity-70 animate-pulse font-medium">
          Sincronizando con el servidor...
        </p>
      )}
    </div>
  </div>
</form>
  );
};

export default PaymentForm;