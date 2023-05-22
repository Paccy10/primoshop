import FormContainerComponent from "../components/Forms/FormContainer.component";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FormComponent from "../components/Forms/Form.component";
import FormFieldComponent from "../components/Forms/FormField.component";
import { RegisterData } from "../interfaces/user.interface";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useRegisterMutation } from "../store/slices/usersApiSlice";
import { useEffect } from "react";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import LoaderComponent from "../components/Loader.component";
import _ from "lodash";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string()
    .required()
    .min(6)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
      "Weak Password - Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password"), ""], "Passwords do not match")
    .label("Confirm Password"),
});

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const onSubmit = async (data: RegisterData) => {
    data = _.omit(data, "confirmPassword");
    try {
      const res = await register(data).unwrap();
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
          <h1>Sign Up</h1>
          <FormComponent
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <FormFieldComponent
              name="name"
              label="Name"
              placeholder="Enter your name"
            />
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
            <FormFieldComponent
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="Confirm your password"
            />
            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              disabled={isLoading}
            >
              Register
            </Button>
            {isLoading && <LoaderComponent />}
          </FormComponent>
          <Row className="py-3">
            <Col>
              Already have an account?{" "}
              <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                Login
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </FormContainerComponent>
  );
};

export default RegisterScreen;
