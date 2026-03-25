import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";
import { registerUser } from "../../services/authService";
import validateRegister from "../../utils/validationRegister";
import { useAuth } from "../../context/AuthContext";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
  const { name, value } = e.target;
  
  console.log(`-> Intentando actualizar [${name}] con el valor: "${value}"`);

  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos que intentas enviar:", form);

    const validationErrors = validateRegister(form);
    console.log("Errores de validación encontrados:", validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("¡Pasamos la validación! Llamando al servicio...");

    setErrors({});
    setLoading(true);

    try {
      const response = await registerUser(form);
      console.log("Usuario creado:", response.data);
      login(response.data);
      navigate("/welcome");
    } catch (err) {
      const backendErrors = err.response?.data?.errors;

      if (backendErrors && Array.isArray(backendErrors)) {
        const formattedErrors = {};
        backendErrors.forEach((error) => {
          formattedErrors[error.field] = error.defaultMessage;
        });
        setErrors(formattedErrors);
      } else {
        const message = err.response?.data?.message || "";
        if (message.toLowerCase().includes("email")) {
          navigate("/login");
        } else {
          setErrors({ general: message || "Error en el registro" });
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 rounded-[25px] bg-[var(--color-background-form)] border-[3px] border-[var(--color-border-form)]"
    >
      <FormField label="Nombre">
        <Input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1 ml-2">{errors.name}</p>}
      </FormField>

      <FormField label="Email">
        <Input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
      </FormField>

      <FormField label="Contraseña">
        <Input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>}
      </FormField>

      {errors.general && (
        <p className="text-red-500 text-center text-sm font-semibold">{errors.general}</p>
      )}

      <div className="flex justify-center mt-2">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
