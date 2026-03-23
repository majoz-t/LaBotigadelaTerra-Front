import { Outlet } from "react-router-dom";
//import Header from "../components/organisms/Header";
//import Footer from "../components/organisms/Footer";

const Layout = () => {
  return (
    <>
      <h1>Header</h1>
      <main>
        <Outlet />
      </main>
      <h1>Footer</h1>
    </>
  );
};

export default Layout;