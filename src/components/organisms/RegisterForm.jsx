import Button from "../atoms/Button";
import FormField from "../molecules/FormField";
import Input from "../atoms/Input";

const RegisterForm = ({ form, handleChange, handleSubmit }) => {
  return (
       <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 rounded-[25px] bg-[var(--color-background-form)] border-[3px] border-[var(--color-border-form)]">
      <FormField label="Nombre">
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
        />
      </FormField>
      <FormField label="Email">
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
        />
      </FormField>
      <FormField label="Contraseña">
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="••••••••"
        />
      </FormField>
      <div className="flex justify-center">
      <Button type="submit" variant="primary">
        Registrarse
      </Button>
      </div>
    </form>
  );
};

export default RegisterForm;
