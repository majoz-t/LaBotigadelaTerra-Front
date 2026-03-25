
const FormField = ({ label, children }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <label className="text-sm font-semibold ml-4 text-[var(--color-primary)]">
        {label}
      </label>
      {children} 
    </div>
  );
};

export default FormField;

