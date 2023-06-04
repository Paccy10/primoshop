import _ from "lodash";
import { UpdateProfileData } from "../interfaces/user.interface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Button, Col, Row, Table } from "react-bootstrap";
import * as Yup from "yup";
import FormComponent from "../components/Forms/Form.component";
import FormFieldComponent from "../components/Forms/FormField.component";
import LoaderComponent from "../components/Loader.component";
import { useProfileMutation } from "../store/slices/usersApiSlice";
import { setCredentials } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { useGetMyOrdersQuery } from "../store/slices/ordersApiSlice";
import MessageComponent from "../components/Message.component";
import { getError } from "../helpers/utils";
import { format } from "date-fns";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3).label("Name"),
  email: Yup.string().email().required().label("Email"),
  password: Yup.string()
    .min(6)
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/,
      "Weak Password - Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character"
    )
    .label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords do not match")
    .label("Confirm Password"),
});

const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  const [updateProfile, { isLoading: isUpdating }] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  const onSubmit = async (data: UpdateProfileData) => {
    data = _.omit(data, "confirmPassword");
    if (data.password === "") {
      data = _.omit(data, "password");
    }
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setCredentials(res));
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>My Profile</h2>
        <FormComponent
          initialValues={{
            name: userInfo?.name || "",
            email: userInfo?.email || "",
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
            disabled={isUpdating}
          >
            Update
          </Button>
          {isUpdating && <LoaderComponent />}
        </FormComponent>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <LoaderComponent />
        ) : error ? (
          <MessageComponent variant="danger">
            {getError(error)}
          </MessageComponent>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{format(new Date(order.createdAt), "dd-MMMM-yyyy")}</td>
                  <td>${order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      format(new Date(order.paidAt), "dd-MMMM-yyyy")
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      format(new Date(order.deliveredAt), "dd-MMMM-yyyy")
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/orders/${order._id}`}>
                      <Button variant="light" size="sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
