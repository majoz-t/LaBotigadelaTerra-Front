
# 🌿 La Botiga de la Terra - Frontend

Bienvenido al repositorio del **Frontend de La Botiga de la Terra**, una plataforma dedicada al bienestar integral inspirada en la medicina Ayurveda.

Este cliente web permite a los usuarios realizar diagnósticos personalizados, gestionar sus trámites y acceder a recomendaciones de salud de forma intuitiva, estética y funcional.

---

## 🚀 Repositorios del Proyecto

Este proyecto forma parte de una arquitectura **Full Stack**.

🔗 **Backend (API REST):**
https://github.com/majoz-t/LaBotigadelaTerra-Back.git

---

## ✨ Características Principales

* 📝 **Sistema de Diagnóstico:** Formulario dinámico con autoguardado en base de datos
* 🔄 **Gestión de Estados:** Seguimiento del proceso (*DRAFT, PENDING_PAYMENT, SUBMITTED*)
* 💳 **Pasarela de Pago Simulada:** Flujo completo de validación del formulario
* 👤 **Área de Usuario (Dashboard):** Gestión de formularios y datos personales
* 🧩 **Arquitectura Atómica:** Componentes reutilizables y escalables
* 🗑️ **Borrado en Cascada:** Eliminación de cuenta respetando la integridad de datos

---

## 🛠️ Tecnologías Utilizadas

* ⚛️ React
* ⚡ Vite
* 🎨 Tailwind CSS
* 🔄 Axios
* 🧭 React Router DOM
* 🎯 Context API (gestión de estado global)
* 🎨 Lucide React (iconos)

---

## 🌐 Arquitectura

El frontend sigue una arquitectura **cliente-servidor**, donde:

* El **cliente (React)** gestiona la interfaz y experiencia de usuario
* El **backend (Spring Boot)** maneja la lógica de negocio y persistencia

👉 Comunicación mediante **HTTP + JSON**

---

## 🧱 Organización del Proyecto

```text
src/
 ├── components/     → Componentes reutilizables (UI)
 ├── pages/          → Vistas principales
 ├── services/       → Comunicación con la API
 ├── hooks/          → Lógica reutilizable
 ├── context/        → Estado global (auth)
 ├── models/         → Tipado de datos
 └── App.jsx
```

---

## 🧠 Patrón de Diseño

Se aplica una arquitectura basada en:

* **Component-Based Architecture (React)**
* Separación de responsabilidades:

  * UI → `components`
  * lógica → `hooks`
  * datos → `services`

Esto permite un sistema:

✔ Escalable
✔ Mantenible
✔ Reutilizable

---

## 🔄 Comunicación con el Backend

El frontend consume la API REST:

```text
http://localhost:8080/api/v1/diagnosticforms
```

Ejemplo:

```javascript
export const createForm = async (data) => {
  const response = await axios.post("/diagnosticforms", data);
  return response.data;
};
```

---

## 🔁 Flujo de Datos

```text
Usuario → Formulario (React)
        → Service (Axios)
        → Backend (Spring Boot)
        → Respuesta (DTO)
        → UI actualizada
```

---

## 🎯 Manejo de Estado

* `useState` → estado local
* `useEffect` → llamadas a API
* `Context API` → autenticación y estado global

---

## ⚠️ Validaciones

* Validación de campos obligatorios
* Tipos de datos correctos
* Feedback inmediato al usuario

👉 Mejora la experiencia y reduce errores del backend

---

## ⚙️ Configuración e Instalación

1. Clonar repositorio:

```bash
git clone https://github.com/majoz-t/LaBotigadelaTerra-Front.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear archivo `.env`:

```env
VITE_API_URL=http://localhost:8080/api/v1
```

4. Ejecutar:

```bash
npm run dev
```

---

## 🎨 Diseño y Estética

El diseño busca transmitir:

🌿 Naturaleza
🧘 Bienestar
🌱 Equilibrio

Mediante:

* Colores tierra y verdes suaves
* Interfaces limpias
* Experiencia intuitiva

---

## 📌 Estado del Proyecto

✔ Frontend funcional
✔ Integración con backend
✔ Flujo completo de formularios
✔ Arquitectura escalable

🚧 Pendiente:

* Autenticación completa (JWT)
* Mejoras UX/UI
* Optimización de estado global

---

## 👩‍💻 Autora

**María José Ozta Castro**
Desarrollo Full Stack 🌿

---

