import ContactForm from '../components/organisms/ContactForm';

const ContactPage = () => {
  return (
    <div className="bg-background py-16 px-6">
      <div className="text-center mb-10">
        <h2 className="text-primary text-4xl mb-4">Contacto</h2>
        <p className="text-primary opacity-80 max-w-xl mx-auto">
          Para realizar un diagnóstico llene el formulario a continuación indicando en comentarios ....
        </p>
      </div>
      
      <ContactForm />
    </div>
  );
};

export default ContactPage