import { useEffect, useState } from "react";
import { diagnosticFormService } from "../../services/diagnosticFormService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import Checkbox from "../atoms/Checkbox";
import {
  WATER_INTAKE_OPTIONS,
  TASTE_OPTIONS,
  PHYSICAL_CONDITIONS_OPTIONS,
  TEMPERATURE_OPTIONS,
  EMOTIONAL_CONDITIONS_OPTIONS,
} from "../../data/formOptions";

const DiagnosticForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    height: "",
    weight: "",
    waterIntake: "",
    temperaturePreference: "",
    digestiveIssues: false,
    tastePreferences: [],
    emotionalConditions: [],
    physicalConditions: [],
  });

  const [formId, setFormId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  useEffect(() => {
    if (!user || formData.age === "") return;

    const prontoParaGuardar =
      formData.height !== "" &&
      formData.weight !== "" &&
      formData.waterIntake !== "" &&
      formData.emotionalConditions.length > 0 &&
      formData.physicalConditions.length > 0;

    if (!prontoParaGuardar) {
      console.log("Esperando a completar campos obligatorios para guardar borrador...");
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSaving(true);
      try {
        const cleanData = {
          userId: user.id,
          age: Number(formData.age),
          height: Number(formData.height),
          weight: Number(formData.weight),
          waterIntake: formData.waterIntake,
          temperaturePreference: formData.temperaturePreference || null,
          digestiveIssues: Boolean(formData.digestiveIssues),
          tastePreferences: formData.tastePreferences,
          emotionalConditions: formData.emotionalConditions,
          physicalConditions: formData.physicalConditions,
        };

        console.log("Intentando guardar borrador para usuario:", user.id);

        if (!formId) {
          const response = await diagnosticFormService.create(cleanData);
          setFormId(response.data.id);
          console.log("¡Borrador creado con éxito!");
        } else {

          await diagnosticFormService.update(formId, cleanData);
          console.log("Progreso actualizado en servidor");
        }
      } catch (error) {
        console.error("Error al guardar:", error.response?.data || error.message);
      } finally {
        setIsSaving(false);
      }
    }, 2000); 
    return () => clearTimeout(delayDebounceFn);
  }, [formData, formId, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const currentList = formData[name];
      setFormData({
        ...formData,
        [name]: checked
          ? [...currentList, value]
          : currentList.filter((item) => item !== value),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitFinal = async () => {
    if (!formId)
      return alert("Primero completa algunos datos para generar un borrador.");
    try {
      await diagnosticFormService.submit(formId);
      navigate("/payment", { state: { formId: formId } });
    } catch (error) {
      console.error("Error al finalizar:", error);
      alert("Hubo un error al enviar el formulario.");
    }
  };

return (
  <form
    onSubmit={(e) => e.preventDefault()}
    className="flex flex-col gap-8 p-6 md:p-10 rounded-[25px] bg-[var(--color-background-form)] border-[3px] border-[var(--color-border-form)] relative"
  >
    <div className="absolute top-4 right-8">
      {isSaving ? (
        <span className="text-xs text-[var(--color-primary)] animate-pulse italic font-medium">
          Guardando cambios...
        </span>
      ) : formId ? (
        <span className="text-xs text-green-600 italic font-medium">
          Progreso sincronizado
        </span>
      ) : (
        <span className="text-xs text-gray-400 italic font-medium">
          Pendiente de completar campos
        </span>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <FormField label="Edad">
        <Input
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="0"
        />
        {!formData.age && <span className="text-[10px] text-orange-500 italic">* Obligatorio</span>}
      </FormField>

      <FormField label="Altura (cm)">
        <Input
          name="height"
          type="number"
          value={formData.height}
          onChange={handleChange}
          placeholder="170"
        />
        {!formData.height && <span className="text-[10px] text-orange-500 italic">* Obligatorio</span>}
      </FormField>

      <FormField label="Peso (kg)">
        <Input
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleChange}
          placeholder="70"
        />
        {!formData.weight && <span className="text-[10px] text-orange-500 italic">* Obligatorio</span>}
      </FormField>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold ml-4 text-[var(--color-primary)]">
          Consumo de agua
        </label>
        <select
          name="waterIntake"
          value={formData.waterIntake}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-[25px] border border-[var(--color-border-form)] bg-[var(--color-background-card)] text-[var(--color-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
        >
          <option value="">Selecciona...</option>
          {WATER_INTAKE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
        {!formData.waterIntake && <span className="text-[10px] text-orange-500 italic ml-4">* Selecciona una opción</span>}
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold ml-4 text-[var(--color-primary)]">
          Preferencia de temperatura
        </label>
        <select
          name="temperaturePreference"
          value={formData.temperaturePreference}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-[25px] border border-[var(--color-border-form)] bg-[var(--color-background-card)] text-[var(--color-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)] cursor-pointer"
        >
          <option value="">Selecciona...</option>
          {TEMPERATURE_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>

    <div className="bg-[var(--color-background-card)] p-4 rounded-[20px] border border-[var(--color-border-form)]/30">
      <Checkbox
        label="¿Sufres de problemas digestivos frecuentes?"
        name="digestiveIssues"
        checked={formData.digestiveIssues}
        onChange={(e) => setFormData({ ...formData, digestiveIssues: e.target.checked })}
      />
    </div>


    <div className="space-y-10">

      <div>
        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b border-[var(--color-border-form)]/20 pb-2">
          Preferencias de Sabor
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TASTE_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.id}
              label={opt.label}
              name="tastePreferences"
              value={opt.id}
              checked={formData.tastePreferences.includes(opt.id)}
              onChange={handleChange}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b border-[var(--color-border-form)]/20 pb-2">
          Estado Emocional
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EMOTIONAL_CONDITIONS_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.id}
              label={opt.label}
              name="emotionalConditions"
              value={opt.id}
              checked={formData.emotionalConditions.includes(opt.id)}
              onChange={handleChange}
            />
          ))}
        </div>
        {formData.emotionalConditions.length === 0 && (
          <span className="text-xs text-orange-500 italic mt-2 block">Selecciona al menos uno para habilitar el envío</span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b border-[var(--color-border-form)]/20 pb-2">
          Condiciones Físicas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PHYSICAL_CONDITIONS_OPTIONS.map((opt) => (
            <Checkbox
              key={opt.id}
              label={opt.label}
              name="physicalConditions"
              value={opt.id}
              checked={formData.physicalConditions.includes(opt.id)}
              onChange={handleChange}
            />
          ))}
        </div>
        {formData.physicalConditions.length === 0 && (
          <span className="text-xs text-orange-500 italic mt-2 block">Selecciona al menos uno para habilitar el envío</span>
        )}
      </div>
    </div>

    <div className="mt-8 flex flex-col items-center gap-4">
      <Button
        onClick={handleSubmitFinal}
        variant="primary"
        disabled={isSaving || !formId}
      >
        {isSaving
          ? "Guardando progreso..."
          : formId
            ? "Pagar y Enviar Diagnóstico"
            : "Complete los campos obligatorios"}
      </Button>
      {!formId && !isSaving && (
        <p className="text-[10px] text-gray-400">
          El borrador se creará automáticamente cuando completes los campos obligatorios.
        </p>
      )}
    </div>
  </form>
);
};

export default DiagnosticForm;
