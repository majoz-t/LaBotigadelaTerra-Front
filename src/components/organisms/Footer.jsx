import { Link } from "react-router-dom";
import mailIcon from "../../assets/images/logomail.png";
import instagramIcon from "../../assets/images/logoinstagram.png";

const Footer = () => {
  return (
    <footer className="bg-[var(--color-primary)] mt-10 p-4 min-h-[100px]">
      <div  className="max-w-6xl mx-auto grid grid-cols-3 items-start min-h-[80px] text-[var(--color-background-card)]">
        <div className="text-left text-xs self-end pb-2">
          © {new Date().getFullYear()} Todos los derechos
        </div>

        <div className="text-center">
          <h4 className="italic font-[var(--font-play)] text-sm font-light self-start">
            La Botiga de la Terra
          </h4>
        </div>

        <div className="flex flex-col items-end gap-2 text-right text-xs text-[12px] self-end ">
          <div className="flex items-center gap-3 mt-1 translate-y-[1px]">
            <Link to="/contact" className="hover:opacity-70 transition text-[12px]">
              Contacto
            </Link>
            <a href="mailto:tuemail@ejemplo.com">
              <img src={mailIcon} alt="Email" className="h-9" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <img src={instagramIcon} alt="Instagram" className="h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
