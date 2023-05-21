import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderComponent from "./components/Header.component";
import FooterComponent from "./components/Footer.component";

const App = () => {
  return (
    <>
      <HeaderComponent />
      <main className="py-3">
        <Container>
          <Outlet />
        </Container>
      </main>
      <FooterComponent />
      <ToastContainer />
    </>
  );
};

export default App;
