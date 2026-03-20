
const Button = ({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = ""
}) => {

    const baseStyles = "w-fit min-w-[140px] px-5 py-2 rounded-[25px] font-medium transition-all duration-300 active:scale-95 cursor-pointer disabled:opacity-50 text-sm md:text-base font-semibold text-center font-inter";
    const variants = {
        primary: "bg-[var(--color-primary-button)] text-[var(--color-background-card)] border-transparent hover:bg-[var(--color-primary-button-hover)] active:bg-[var(--color-primary-button-active)] shadow-sm",
        secondary: "bg-[var(--color-secondary-button)] text-[var(--color-border-button)] border-[var(--color-border-button)] hover:bg-[var(--color-secondary-button-hover)] active:bg-[var(--color-secondary-button-active)] shadow-sm"
    }

    return(
        <button 
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;