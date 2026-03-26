import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { diagnosticFormService } from "../../src/services/diagnosticFormService";
import { useAuth } from "../../src/context/AuthContext";
import { deleteUser } from "../../src/services/authService";
import Button from "../../src/components/atoms/Button";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [myForms, setMyForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const STATUS_MAP = {
    DRAFT: {
      label: "Borrador",
      color: "bg-[var(--color-light-text)] text-[var(--color-primary)",
    },
    PENDING_PAYMENT: {
      label: "Pendiente de Pago",
      color: "bg-[var(--color-light-text)] text-[var(--color-primary)",
    },
    SUBMITTED: {
      label: "Enviado",
      color: "bg-[var(--color-light-text)] text-[var(--color-border-button)",
    },
    COMPLETED: {
      label: "Finalizado",
      color: "bg-[var(--color-light-text)] text-[var(--color-border-button)",
    },
  };

  useEffect(() => {
    const loadForms = async () => {
      if (!user || !user.id) return;
      try {
        setLoading(true);
        const response = await diagnosticFormService.getAllByUser(user.id);
        setMyForms(response.data);
      } catch (error) {
        console.error("Error al cargar formularios:", error);
      } finally {
        setLoading(false);
      }
    };
    loadForms();
  }, [user]);

  const handleDeleteForm = async (id) => {
    const firstCheck = window.confirm(
      "¿Estás seguro de que quieres eliminar este diagnóstico?",
    );
    if (firstCheck) {
      const secondCheck = window.confirm(
        "¡Atención! Esta acción borrará todos los datos de su diagnóstico permanentemente. ¿Realmente desea continuar?",
      );
      if (secondCheck) {
        try {
          await diagnosticFormService.deleteForm(id);
          setMyForms(myForms.filter((f) => f.id !== id));
          alert("Diagnóstico eliminado correctamente");
        } catch (error) {
          console.error("Error al borrar:", error);
          alert(
            "Error al querer borrar el diagnóstico, si éste ya fue enviado no lo podrá eliminar",
          );
        }
      }
    }
  };
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm(
      "¿Estás totalmente seguro? Esta acción eliminará tu cuenta y todos tus diagnósticos de forma permanente.",
    );
    if (!isConfirmed) return;
    try {
      await deleteUser(user.id);
      alert("Cuenta eliminada con éxito. Gracias por habernos visitado.");
      logout();
      navigate("/");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
      alert(
        "No se pudo eliminar la cuenta en este momento. Inténtalo de nuevo más tarde.",
      );
    }
  };
  return (
    <div className="min-h-screen bg-background py-12 px-6 font-inter">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-primary text-xl mb-10 text-center uppercase tracking-widest">
          Mi Área Privada
        </h2>

        <article className="bg-[var(--color-background-card)] p-8 rounded-[40px] border-[3px] border-border-form/30 shadow-sm mb-12 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <fieldset className="flex flex-col gap-1 border-none p-0">
              <label className="font-bold text-[var(--color-primary)] uppercase ml-4 text-[10px]">
                Nombre
              </label>
              <p className="bg-[var(--color-background-card)]/60 px-6 py-3 rounded-full border border-border-form/40 text-primary">
                {user?.name || "Usuario"}
              </p>
            </fieldset>
            <fieldset className="flex flex-col gap-1 border-none p-0">
              <label className="font-bold text-[var(--color-primary)] uppercase ml-4 text-[10px]">
                Email
              </label>
              <p className="bg-white/60 px-6 py-3 rounded-full border border-border-form/40 text-primary">
                {user?.email || "email@ejemplo.com"}
              </p>
            </fieldset>
          </div>
          <fieldset className="flex flex-col gap-1 max-w-xs border-none p-0">
            <label className="font-bold text-[var(--color-primary)] uppercase ml-4 text-[10px]">
              Contraseña
            </label>
            <p className="bg-white/60 px-6 py-3 rounded-full border border-border-form/40 text-primary tracking-widest">
              ••••••••••••
            </p>
          </fieldset>
          <div className="flex justify-end w-full">
            <Button
              variant="primary"
              onClick={() => navigate("/edit-profile")}
              className="px-8 py-2 text-sm "
            >
              Editar Perfil
            </Button>
          </div>
        </article>

        <section className="mb-12">
          <h3 className="text-primary font-play text-xl mb-6 ml-4 italic">
            Historial de Diagnósticos
          </h3>

          <div className="bg-[var(--color-secondary-button)] rounded-[30px] border border-border-form/10 overflow-hidden shadow-sm">
            <header className="bg-background-form/30 flex px-6 py-4 border-b border-border-form/20 text-[10px] font-bold text-primary uppercase">
              <span className="flex-[2]">Fecha</span>
              <span className="flex-[3]">Trámite</span>
              <span className="flex-[2] text-center">Estado</span>
              <span className="flex-[3] text-right">Acciones</span>
            </header>

            <div className="flex flex-col">
              {myForms.length > 0 ? (
                myForms.map((form) => (
                  <div
                    key={form.id}
                    className="flex items-center px-6 py-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <span className="flex-[2] text-sm text-primary/80 font-serif">
                      {form.createdAt
                        ? new Date(form.createdAt).toLocaleDateString()
                        : new Date().toLocaleDateString()}
                    </span>
                    <span className="flex-[3] text-sm font-medium text-primary">
                      Diagnóstico inicial
                    </span>
                    <span className="flex-[2] text-center">
                      {(() => {
                        const stateInfo = STATUS_MAP[form.formStatus] || {
                          label: form.formStatus || "Pendiente",
                          color: "bg-primary/10 text-primary",
                        };
                        return (
                          <b className={`text-[9px] px-3 py-1 rounded-full font-bold uppercase ${stateInfo.color}`}>
                            {stateInfo.label}
                          </b>
                        );
                      })()}
                    </span>
                    <nav className="flex-[3] flex gap-2 justify-end">
                      <Button
                        variant="primary"
                        onClick={() => navigate(`/diagnostic/${form.id}`)}
                        className="py-0.5 px-1.5 text-[8px] min-w-fit"
                      >
                        EDITAR
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleDeleteForm(form.id)}
                        className="py-0.5 px-1.5 text-[8px] min-w-fit border-[var(--color-border-button)]-200 text-[var(--color-border-button)]"
                      >
                        BORRAR
                      </Button>
                    </nav>
                  </div>
                ))
              ) : (
                <p className="p-10 text-center italic text-primary/40">
                  No se encontraron diagnósticos previos.
                </p>
              )}
            </div>
          </div>
        </section>
        <section className="flex flex-row justify-center items-center gap-4 md:gap-8">
          <Button
            variant="secondary"
            onClick={handleDeleteAccount}
            className="px-4 py-2 text-xs border-[var(--color-border-button)]-2 text-[var(--color-border-button)]-2 hover:bg-red-50"
          >
            Eliminar Cuenta
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/welcome")}
            className="px-8 py-2 text-sm border-2"
          >
            Volver
          </Button>
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
