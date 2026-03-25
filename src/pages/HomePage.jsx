import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../src/components/atoms/Button";
import logopcipal from "../../src/assets/images/logopcipal.png";
import logo1 from "../../src/assets/images/logoauriculo.png";
import logo2 from "../../src/assets/images/logoherboristeria.png";
import logo3 from "../../src/assets/images/logomanosclaro.png";
import logo4 from "../../src/assets/images/logoventosas.png";

const HomePage = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: 1,
      title: "Acupuntura",
      icon: logo1,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in pellentesque neque, et porta dui.",
    },
    {
      id: 2,
      title: "Flores de Bach",
      icon: logo2,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in pellentesque neque, et porta dui.",
    },
    {
      id: 3,
      title: "Fitoterapia",
      icon: logo3,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in pellentesque neque, et porta dui.",
    },
    {
      id: 4,
      title: "Masajes",
      icon: logo4,
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in pellentesque neque, et porta dui.",
    },
  ];
  return (
    <div className="min-h-screen bg-background font-inter text-primary">
      <section className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="flex flex-col md:grid md:grid-cols-10 items-center gap-12">
          <div className="md:col-span-7 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-6xl mb-6">
              Diagnóstico integral para tu bienestar
            </h1>
            <p className="text-base md:text-lg leading-relaxed mb-10 opacity-80 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              egestas diam, sed convallis metus. Aenean hendrerit, justo sed
              efficitur ornare, ex neque interdum nisl, non dictum sem libero ut
              nisl. Aliquam nec purus lacus.
            </p>
            <div className="flex justify-center w-full">
              <Button
                variant="primary"
                onClick={() => navigate("/contact")}
                className="px-10 py-4 text-lg"
              >
                Diagnóstico Online
              </Button>
            </div>
          </div>
          <div className="hidden md:flex md:col-span-3 justify-center">
            <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-background-form flex items-center justify-center border-4 border-white shadow-sm overflow-hidden p-4">
              <img
                src={logopcipal}
                alt="La Botiga de la Terra Logo"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-background-card p-8 rounded-[45px] shadow-sm border border-border-form/20 flex flex-col items-center text-center transition-transform hover:-translate-y-2"
            >
              <div className="w-30 h-30 rounded-full border-2 border-primary mb-6 flex items-center justify-center bg-background p-3">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <h3 className="text-primary mb-4">{service.title}</h3>
              <p className="text-xs opacity-70 leading-relaxed mb-8 italic">
                "{service.desc}"
              </p>
              <Button
                variant="primary"
                className="text-xs px-6 py-2"
                onClick={() => navigate('/soon')}
              >
                Saber más
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
