import { useState } from "react";
import RegisterForm from "../components/organisms/RegisterForm";
import { registerUser } from "../services/authService";
import validateRegister from "../utils/validationRegister";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateRegister(form);
    if (Object.keys(validationErrors).lenght > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const response = await registerUser(form);
      console.log("Usuario creado:", response.data);
      navigate("/welcome");
      // setForm({
      //   name: "",
      //   email: "",
      //   password: "",
      // });
    } catch (err) {
      const backendErrors = err.data?.errors;

      if (backendErrors && Array.isArray(backendErrors)) {
        const formattedErrors = {};
        backendErrors.forEach((error) => {
          const field = error.field;
          const message = error.defaultMessage;

          if (formattedErrors[field]) {
            formattedErrors[field] += " " + message;
          } else {
            formattedErrors[field] = message;
          }
        });
        setErrors(formattedErrors);
      } else {
       const message = err.data?.message || "";
      if (message.toLowerCase().includes("email")) {
        navigate("/login");
      } else {
        setErrors({
          general: message || "Error en el registro",
        });
      }
    }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <div className="bg-[var(--color-background-card)] p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-font-semibold mb-6 text-center">
          Registro
        </h2>
        <RegisterForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          errors={errors}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default RegisterPage;
