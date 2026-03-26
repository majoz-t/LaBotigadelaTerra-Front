import RegisterForm from "../components/organisms/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-12 bg-[var(--color-background)] gap-6">
      <h2 className="text-2xl font-bold text-[var(--color-primary)] text-center">
        Registro
      </h2>

      <div className="w-full max-w-sm px-4">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
