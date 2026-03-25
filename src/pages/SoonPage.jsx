import { useNavigate } from 'react-router-dom';
import Button from '../../src/components/atoms/Button';

const SoonPage = () => {
  const navigate = useNavigate();

  const futureServices = [
    { id: 1, img: null, label: "XXXXXX" },
    { id: 2, img: null, label: "XXXXXX" },
    { id: 3, img: null, label: "XXXXXX" },
    { id: 4, img: null, label: "XXXXXX" },
    { id: 5, img: null, label: "XXXXXX" },
    { id: 6, img: null, label: "XXXXXX" },
  ];
  return (
    <div className="min-h-[70vh] bg-background flex flex-col items-center py-16 px-6 font-inter">
      <div className="text-center max-w-3xl mb-16">
        <h2 className="text-primary text-3xl md:text-4xl mb-6">
          Próximamente encontrarás....
        </h2>
        <p className="text-primary opacity-80 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas diam, 
          sed convallis metus. Aenean hendrerit, justo sed efficitur ornare, ex
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-20 max-w-6xl">
        {futureServices.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-4 group">
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 border-primary bg-white flex items-center justify-center p-1 shadow-sm transition-transform group-hover:scale-105">
               <div className="w-full h-full rounded-full border border-border-form/20 flex items-center justify-center bg-background/20 overflow-hidden">
                  {item.img ? (
                    <img src={item.img} alt={item.label} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-12 h-12 bg-border-form/10 rounded-full" /> 
                  )}
               </div>
            </div>
            <span className="text-[10px] md:text-xs font-bold text-primary tracking-[0.2em] uppercase">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button 
          variant="primary" 
          onClick={() => navigate('/contact')}
          className="px-10 py-3 text-lg"
        >
          Diagnóstico Online
        </Button>
      </div>

    </div>
  );
};

export default SoonPage