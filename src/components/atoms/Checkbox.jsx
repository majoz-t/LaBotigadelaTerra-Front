
const Checkbox = ({ label, name, value, checked, onChange }) => {
  return (
    <div className="flex items-center gap-3 py-1 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="
            appearance-none 
            w-5 h-5 
            rounded-full 
            border-2 
            border-[var(--color-border-form)] 
            bg-[var(--color-background-card)]
            checked:bg-[var(--color-border-form)] 
            checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iMjAgNiA5IDE3IDQgMTIiPjwvcG9seWxpbmU+PC9zdmc+')]
            checked:bg-[length:14px_14px]
            checked:bg-no-repeat
            checked:bg-center
            transition-all duration-200 
            cursor-pointer
          "
      />
      <span className="text-[var(--color-primary)] font-medium text-sm md:text-base leading-tight select-none ">
        {label}
        </span>
    </div>
  );
};

export default Checkbox;