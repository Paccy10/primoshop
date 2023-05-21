import FormContainerComponent from "../components/Forms/FormContainer.component";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormComponent from "../components/Forms/Form.component";
import FormFieldComponent from "../components/Forms/FormField.component";
import { LoginData } from "../interfaces/user.interface";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLoginMutation } from "../store/slices/usersApiSlice";
import { useEffect } from "react";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import LoaderComponent from "../components/Loader.component";

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().label("Password"),
});

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials(res));
      navigate(redirect);
    } catch (error: any) {
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <FormContainerComponent>
      <Card>
        <Card.Body>
          <h1>Sign In</h1>
          <FormComponent
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <FormFieldComponent
              name="email"
              type="email"
              label="Email Address"
              placeholder="Enter your email"
            />
            <FormFieldComponent
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
            />
            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              disabled={isLoading}
            >
              Login
            </Button>
            {isLoading && <LoaderComponent />}
          </FormComponent>
          <Row className="py-3">
            <Col>
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
              >
                Register
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainerComponent>
  );
};

export default LoginScreen;
