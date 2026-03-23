import { Link } from "react-router-dom";
import logopcipal from "../../assets/images/logopcipal.png";
import { Menu } from "lucide-react";
import { useState } from "react";
import Button from "../atoms/Button";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-[var(--color-background)] shadow-md p-3 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <img src={logopcipal} alt="Logo" className="h-16 md:h-18"/>
        <h1 className="!text-lg md:!text-2xl">La Botiga de la Terra</h1>
       </Link>
       <nav className="hidden md:flex gap-6 items-center">
          <Link className="text-[var(--color-primary)] hover:opacity-70 transition" to="/soon">Servicios</Link>
          <Link to="/contact"><Button variant="primary">Diagnóstico Online</Button></Link>
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          <Menu color="var(--color-primary)" size={28}/>
        </button>
       </div>
      {open && (
        <nav className="mt-4 flex flex-col gap-2 max-w-6xl mx-auto">
          <Link to="/soon" className="text-[var(--color-primary)] hover:opacity-70 transition">Servicios</Link>
          <Link to="/contact" className="text-[var(--color-primary)]">Diagnóstico Online</Link>
          {/* <Link to="/login" className="text-[var(--color-primary)]">Login</Link> */}
        </nav>
      )}
     
    </header>
  );
};

export default Header;

// cuando tenga el login
//if (user) → mostrar dashboard / logout
//if (!user) → mostrar login / register
