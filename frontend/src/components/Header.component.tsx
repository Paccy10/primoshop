import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/images/logo.png";
import { useAppSelector } from "../store/hooks";

const HeaderComponent = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="PrimoShop" />
              PrimoShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <div className="d-inline-flex align-items-center">
                    <FaShoppingCart />
                    <span className="mx-1">Cart</span>
                    {cartItems.length > 0 && (
                      <Badge pill bg="success">
                        {cartItems.reduce(
                          (quantity, item) => quantity + item.quantity,
                          0
                        )}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <div className="d-inline-flex align-items-center">
                    <FaUser />
                    <span className="mx-1">Login</span>
                  </div>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderComponent;
