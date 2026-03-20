import { useState } from "react";
import RegisterForm from "../components/organisms/RegisterForm";

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/v1/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error("Error en el registro");
      }
      const data = await response.json();
      console.log("Usuario creado:", data);
    } catch (error) {
      console.error(error);
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
        />
      </div>
    </div>
  );
};

export default RegisterPage;
