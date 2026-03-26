import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../molecules/FormField';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const ContactForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      console.log("Contacto enviado:", form);
      setLoading(false);
      alert("Mensaje enviado con éxito");
      navigate('/');
    }, 1500);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 rounded-[25px] bg-[var(--color-background-form)] border-[3px] border-[var(--color-border-form)] w-full max-w-2xl mx-auto"
    >
      <FormField label="Nombre">
        <Input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
        />
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
      </FormField>
      <FormField label="Comentarios">
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="¿En qué podemos ayudarte?"
          rows="4"
          className="w-full px-4 py-2 rounded-[25px] border border-[var(--color-border-form)] bg-[var(--color-background-card)] text-[var(--color-primary)] outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
        />
      </FormField>
      <div className="flex justify-center mt-2">
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? "Enviando..." : "Enviar"}
        </Button>
      </div>
    </form>
  );
};

export default ContactForm;