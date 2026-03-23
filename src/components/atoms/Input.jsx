import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  className = "",
  ...props
}) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-[25px] border text-sm md:text-base transition-all duration-200 outline-none";

  const styles =
    "bg-[var(--color-background-card)] border-[var(--color-border-form)] focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]";

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseStyles} ${styles} ${className}`}
      {...props}
    />
  );
};

export default Input;
