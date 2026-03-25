import { useEffect, useState } from "react";
import { diagnosticFormService } from "../../services/diagnosticFormService";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
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
  const { id } = useParams();
  const [formId, setFormId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
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

  useEffect(() => {
    if (id) return;
    if (!user || formData.age === "") return;
    const tieneDatosBasicos = formData.age && formData.height && formData.weight; 
    const tieneCondiciones = formData.physicalConditions.length > 0 && formData.emotionalConditions.length > 0; 
    if (!tieneDatosBasicos || !tieneCondiciones) {
      console.log("Autoguardado en espera: faltan condiciones físicas/emocionales");
         return;
    }  
    
    const delayDebounceFn = setTimeout(async () => {
      setIsSaving(true);
      try {
        const cleanData = {
          userId: user.id,
          age: Number(formData.age) || 0,
          height: Number(formData.height) || 0,
          weight: Number(formData.weight) || 0,
          waterIntake: formData.waterIntake || "NORMAL",
          temperaturePreference: formData.temperaturePreference || null,
          digestiveIssues: Boolean(formData.digestiveIssues),
          tastePreferences: formData.tastePreferences || [],
          emotionalConditions: formData.emotionalConditions || [],
          physicalConditions: formData.physicalConditions || [],
        };

        if (!formId) {
          const response = await diagnosticFormService.create(cleanData);
          setFormId(response.data.id);
        } else {
          await diagnosticFormService.update(formId, cleanData);
        }
      } catch (error) {
        console.error("Error al guardar borrador:", error);
      } finally {
        setIsSaving(false);
      }
    }, 2000);
    return () => clearTimeout(delayDebounceFn);
  }, [formData, formId, user, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const currentList = formData[name] || [];
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
    const camposIncompletos =
      !formData.age ||
      !formData.height ||
      !formData.weight ||
      !formData.waterIntake;

    const faltanCheckboxes = formData.emotionalConditions.length === 0 || formData.physicalConditions.length === 0;
    if (camposIncompletos || faltanCheckboxes) {
      alert(
        "Por favor, completa todos los campos obligatorios y selecciona al menos una condición emocional y física.",
      );
      return;
    }
    const idFinal = id || formId;
    try {
      setIsSaving(true);
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
      await diagnosticFormService.update(idFinal, cleanData);
      await diagnosticFormService.submit(idFinal);
      navigate("/payment", { state: { formId: idFinal } });
    } catch (error) {
      console.error("Error al enviar:", error);
      alert("No se pudo procesar el envío, tu formulario puede que ya haya sido enviado.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchFormData = async () => {
        try {
          const response = await diagnosticFormService.getById(id);
          setFormData(response.data);
          setFormId(id);
        } catch (error) {
          console.error("No se pudo cargar el formulario", error);
        }
      };
      fetchFormData();
    }
  }, [id]);

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
          <span className="text-xs text-[var(--color-primary)] italic font-medium">
            Borrador guardado
          </span>
        ) : (
          <span className="text-xs text-[var(--color-primary)] italic font-medium">
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
          {!formData.age && (
            <span className="text-[10px] text-orange-500 italic">
              * Obligatorio
            </span>
          )}
        </FormField>
        <FormField label="Altura (cm)">
          <Input
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            placeholder="170"
          />
          {!formData.height && (
            <span className="text-[10px] text-orange-500 italic">
              * Obligatorio
            </span>
          )}
        </FormField>
        <FormField label="Peso (kg)">
          <Input
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            placeholder="70"
          />
          {!formData.weight && (
            <span className="text-[10px] text-orange-500 italic">
              * Obligatorio
            </span>
          )}
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
            className="w-full px-4 py-2 rounded-[25px] border border-[var(--color-border-form)] bg-[var(--color-background-card)] text-[var(--color-primary)] outline-none"
          >
            <option value="">Selecciona...</option>
            {WATER_INTAKE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
          {!formData.waterIntake && (
            <span className="text-[10px] text-orange-500 italic ml-4">
              * Selecciona una opción
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold ml-4 text-[var(--color-primary)]">
            Preferencia de temperatura
          </label>
          <select
            name="temperaturePreference"
            value={formData.temperaturePreference}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-[25px] border border-[var(--color-border-form)] bg-[var(--color-background-card)] text-[var(--color-primary)] outline-none"
          >
            <option value="">Selecciona...</option>
            {TEMPERATURE_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[var(--color-background-card)] p-4 rounded-[20px] border border-[var(--color-border-form)]/30">
        <Checkbox
          label="¿Sufres de problemas digestivos frecuentes?"
          name="digestiveIssues"
          checked={formData.digestiveIssues}
          onChange={(e) =>
            setFormData({ ...formData, digestiveIssues: e.target.checked })
          }
        />
      </div>

      <div className="space-y-10">
        <div>
          <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b pb-2">
            Preferencias de Sabor
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TASTE_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.id}
                label={opt.label}
                name="tastePreferences"
                value={opt.id}
                checked={formData.tastePreferences?.includes(opt.id)}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b pb-2">
            Estado Emocional
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMOTIONAL_CONDITIONS_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.id}
                label={opt.label}
                name="emotionalConditions"
                value={opt.id}
                checked={formData.emotionalConditions?.includes(opt.id)}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-[var(--color-primary)] mb-4 border-b pb-2">
            Condiciones Físicas
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PHYSICAL_CONDITIONS_OPTIONS.map((opt) => (
              <Checkbox
                key={opt.id}
                label={opt.label}
                name="physicalConditions"
                value={opt.id}
                checked={formData.physicalConditions?.includes(opt.id)}
                onChange={handleChange}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Button
          onClick={handleSubmitFinal} 
          variant="primary"
          disabled={isSaving} 
        >
          {isSaving ? "Guardando..." : "Pagar y Enviar Diagnóstico"}
        </Button>
        
        {!formId && !isSaving && (
          <p className="text-[10px] text-orange-500 italic animate-pulse">
            * Debes completar los campos obligatorios para habilitar el envío.
          </p>
        )}
        <Button
          variant="secondary"
          onClick={() => navigate("/userdash")}
          className="px-4 py-1 text-sm border-2"
        >
          Volver
        </Button>
      </div>
    </form>
  );
};

export default DiagnosticForm;
