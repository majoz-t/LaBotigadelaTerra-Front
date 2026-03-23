import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";

const RegisterForm = ({
  form,
  handleChange,
  handleSubmit,
  errors,
  loading,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 rounded-[25px] bg-[var(--color-background-form)] border-[3px] border-[var(--color-border-form)]"
    >
      <FormField label="Nombre">
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </FormField>
      <FormField label="Email">
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </FormField>
      <FormField label="Contraseña">
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </FormField>
      {errors.general && (
        <p className="text-red-500 text-center">{errors.general}</p>
      )}
      <div className="flex justify-center">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Registrando..." : "Registrarse"}
          
        </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
