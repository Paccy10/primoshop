import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";
import MessageComponent from "../../components/Message.component";
import LoaderComponent from "../../components/Loader.component";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../store/slices/usersApiSlice";
import { getError } from "../../helpers/utils";
import { toast } from "react-toastify";

const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: deletingUser }] = useDeleteUserMutation();

  const onDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const res = await deleteUser(id).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error: any) {
        toast.error(error.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {deletingUser && <LoaderComponent />}
      {isLoading ? (
        <LoaderComponent />
      ) : error ? (
        <MessageComponent variant="danger">{getError(error)}</MessageComponent>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>IsAdmin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/users/${user._id}/edit`}>
                    <Button variant="light" size="sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDeleteUser(user._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
