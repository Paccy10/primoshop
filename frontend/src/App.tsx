import { Container } from "react-bootstrap";
import HeaderComponent from "./components/Header.component";
import FooterComponent from "./components/Footer.component";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <>
      <HeaderComponent />
      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>
      <FooterComponent />
    </>
  );
};

export default App;
