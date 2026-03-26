import { Link, useNavigate } from "react-router-dom";
import logopcipal from "../../assets/images/logopcipal.png";
import { Menu } from "lucide-react";
import { useState } from "react";
import Button from "../atoms/Button";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-[var(--color-background)] shadow-md p-3 relative z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img src={logopcipal} alt="Logo" className="h-16 md:h-18" />
          <h1 className="!text-lg md:!text-2xl font-play text-primary">
            La Botiga de la Terra
          </h1>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link
            className="text-primary hover:opacity-70 transition font-medium"
            to="/soon"
          >
            Servicios
          </Link>
          {!user ? (
            <>
              <Link
                className="text-primary hover:opacity-70 transition font-medium"
                to="/login"
              >
                Login
              </Link>
              <Link to="/contact">
                <Button variant="primary">Diagnóstico Online</Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <Button
                variant="secondary"
                onClick={handleLogout}
                className="py-0.5 px-2 text-[10px] border-[var(--color-border-button)] text-[var(--color-border-button)] hover:opacity-80"
              >
                Salir
              </Button>
              <Link
                to="/userdash"
                className="text-[var(--color-border-button)] font italic underline decoration-1 underline-offset-4"
              >
                {user.name || "Mi Perfil"}
              </Link>
            </div>
          )}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-primary"
        >
          <Menu size={28} />
        </button>
      </div>
      {open && (
        <nav className="md:hidden mt-4 flex flex-col gap-4 p-4 bg-[var(--color-background-card)] rounded-2xl shadow-inner">
          <Link
            to="/soon"
            onClick={() => setOpen(false)}
            className="text-primary border-b pb-2"
          >
            Servicios
          </Link>
          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-primary border-b pb-2"
              >
                Login
              </Link>
              <Link to="/contact" onClick={() => setOpen(false)}>
                <Button variant="primary" className="w-full">
                  Diagnóstico Online
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="text-[var(--color-border-button)] font italic"
              >
                Mi Área ({user.name})
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-[var(--color-border-button)] font-medium"
              >
                Cerrar Sesión
              </button>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
