
import DiagnosticForm from '../components/organisms/DiagnosticForm';

const DiagnosticFormPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <section className="intro-text">
        <h1 className="text-3xl md:text-5xl text-center mb-8 md:mb-16">Formulario de Diagnóstico</h1>
      </section>
      <DiagnosticForm />
    </div>
  );
};

export default DiagnosticFormPage;
