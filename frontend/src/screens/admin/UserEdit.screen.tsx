import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import MessageComponent from "../../components/Message.component";
import LoaderComponent from "../../components/Loader.component";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../store/slices/usersApiSlice";
import * as Yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import FormContainerComponent from "../../components/Forms/FormContainer.component";
import { getError } from "../../helpers/utils";
import FormFieldComponent from "../../components/Forms/FormField.component";
import { UpdateProfileData } from "../../interfaces/user.interface";
import { Formik, Form as FormikForm } from "formik";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
});

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const { data: user, isLoading, error } = useGetUserDetailsQuery(`${userId}`);
  const [updateUser, { isLoading: editingUser }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: UpdateProfileData) => {
    try {
      await updateUser({ data, userId: `${userId}` }).unwrap();
      toast.success("User updated successfully");
      navigate("/admin/users");
    } catch (error: any) {
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn btn-light my-3">
        <FaArrowLeft /> <span className="ms-2">Go Back</span>
      </Link>
      <FormContainerComponent>
        <h1>Edit User</h1>
        {editingUser && <LoaderComponent />}
        {isLoading ? (
          <LoaderComponent />
        ) : error ? (
          <MessageComponent variant="danger">
            {getError(error)}
          </MessageComponent>
        ) : (
          <>
            <Formik
              initialValues={{
                name: user?.name || "",
                email: user?.email || "",
                isAdmin: user?.isAdmin || false,
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, setFieldValue }) => (
                <FormikForm>
                  <FormFieldComponent
                    name="name"
                    label="Name"
                    placeholder="Enter name"
                  />
                  <FormFieldComponent
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Enter email"
                  />

                  <Form.Group>
                    <Form.Check
                      type="checkbox"
                      label="Is Admin"
                      checked={values.isAdmin}
                      onChange={(e) =>
                        setFieldValue("isAdmin", e.target.checked)
                      }
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    variant="primary"
                    className="mt-2"
                    disabled={editingUser}
                  >
                    Update
                  </Button>
                </FormikForm>
              )}
            </Formik>
          </>
        )}
      </FormContainerComponent>
    </>
  );
};

export default UserEditScreen;
