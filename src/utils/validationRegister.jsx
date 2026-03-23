

const validateRegister = (form) => {
  const errors = {};

  if (!form.name?.trim()) {
    errors.name = "El nombre es obligatorio";
  }
  if (!form.email?.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!isValidEmail(form.email)) {
    errors.email = "El email no es válido";
  }
  if (!form.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (form.password.length < 6) {
    errors.password = "Debe tener al menos 6 caracteres";
  }
  return errors;
};

export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default validateRegister;