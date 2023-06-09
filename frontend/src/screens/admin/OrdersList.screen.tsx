import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import MessageComponent from "../../components/Message.component";
import LoaderComponent from "../../components/Loader.component";
import { useGetOrdersQuery } from "../../store/slices/ordersApiSlice";
import { getError } from "../../helpers/utils";
import { format } from "date-fns";

const OrdersListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders</h1>
      {isLoading ? (
        <LoaderComponent />
      ) : error ? (
        <MessageComponent variant="danger">{getError(error)}</MessageComponent>
      ) : (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
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
                <td>{order.user.name}</td>
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
    </>
  );
};

export default OrdersListScreen;
