import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/images/logo.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../store/slices/usersApiSlice";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import SearchBoxComponent from "./SearchBox.component";

const HeaderComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cartItems } = useAppSelector((state) => state.cart);
  const { userInfo } = useAppSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const onLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error: any) {
      toast.error(error.data?.message || error.error);
    }
  };

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
              <SearchBoxComponent />
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
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {userInfo.isAdmin && (
                    <>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>
                    </>
                  )}
                  <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <div className="d-inline-flex align-items-center">
                      <FaUser />
                      <span className="mx-1">Login</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default HeaderComponent;
