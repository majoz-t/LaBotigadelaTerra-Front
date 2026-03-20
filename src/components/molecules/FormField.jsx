

const FormField = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[var(--color-primary)]">{label}</label>
      {children}
    </div>
  );
};

export default FormField;
