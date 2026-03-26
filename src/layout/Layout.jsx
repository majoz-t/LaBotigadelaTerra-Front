import { Outlet } from "react-router-dom";
import Header from "../components/organisms/Header";
import Footer from "../components/organisms/Footer";

const Layout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <Header/>
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer/>
    </section>
  );
};

export default Layout;