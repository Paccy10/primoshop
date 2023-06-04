import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import MessageComponent from "../components/Message.component";
import LoaderComponent from "../components/Loader.component";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
} from "../store/slices/ordersApiSlice";
import { getError } from "../helpers/utils";
import { useEffect } from "react";
import { format } from "date-fns";
import { useAppSelector } from "../store/hooks";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderDetailsQuery(`${orderId}`);
  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();
  const [{ isPending }, paypalDispacth] = usePayPalScriptReducer();
  const { userInfo } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const loadPaypalScript = async () => {
      paypalDispacth({
        type: "resetOptions",
        value: {
          "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}`,
          currency: "USD",
        },
      });
    };

    if (order && !order.isPaid) {
      if (!window.paypal) {
        loadPaypalScript();
      }
    }
  }, [order, paypalDispacth]);

  const onCreateOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: order?.totalPrice } }],
      })
      .then((orderId: string) => {
        return orderId;
      });
  };
  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then(async (details: any) => {
      try {
        await payOrder({
          orderId: `${orderId}`,
          paymentResult: {
            id: details.id,
            status: details.status,
            email_address: details.payer?.email_address,
            update_time: details.update_time,
          },
        });
        refetch();
        toast.success("Payment successful");
      } catch (error: any) {
        toast.error(getError(error));
      }
    });
  };
  const onError = (error: any) => {
    toast.error(error.message);
  };

  const onMarkAsDelivered = async () => {
    try {
      await deliverOrder(`${orderId}`);
      refetch();
      toast.success("Order delivered successfully");
    } catch (error: any) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : isError ? (
        <MessageComponent>{getError(error)}</MessageComponent>
      ) : (
        order && (
          <>
            <h1>Order {order._id}</h1>
            <Row>
              <Col md={8}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Name: </strong>
                      {order.user.name}
                    </p>
                    <p>
                      <strong>Email: </strong> {order.user.email}
                    </p>
                    <p>
                      <strong>Address: </strong> {order.shippingAddress.address}
                      , {order.shippingAddress.city}{" "}
                      {order.shippingAddress.postalCode},{" "}
                      {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                      <MessageComponent variant="success">
                        Delivered on{" "}
                        {format(new Date(order.deliveredAt), "MMMM do, yyyy")}
                      </MessageComponent>
                    ) : (
                      <MessageComponent variant="danger">
                        Not Delivered
                      </MessageComponent>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p>
                      <strong>Method: </strong>
                      {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                      <MessageComponent variant="success">
                        Paid on{" "}
                        {format(new Date(order.paidAt), "MMMM do, yyyy")}
                      </MessageComponent>
                    ) : (
                      <MessageComponent variant="danger">
                        Not Paid
                      </MessageComponent>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/products/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.quantity} x ${item.price} = $
                            {item.quantity * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Items</Col>
                        <Col>${order.itemsPrice}</Col>
                      </Row>
                      <Row>
                        <Col>Shipping</Col>
                        <Col>${order.shippingPrice}</Col>
                      </Row>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${order.taxPrice}</Col>
                      </Row>
                      <Row>
                        <Col>Total</Col>
                        <Col>${order.totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    {!order.isPaid && (
                      <ListGroup.Item>
                        {isPaying && <LoaderComponent />}
                        {isPending ? (
                          <LoaderComponent />
                        ) : (
                          <div>
                            <div>
                              <PayPalButtons
                                createOrder={onCreateOrder}
                                onApprove={onApprove}
                                onError={onError}
                              />
                            </div>
                          </div>
                        )}
                      </ListGroup.Item>
                    )}
                    {isDelivering && <LoaderComponent />}
                    {userInfo &&
                      userInfo.isAdmin &&
                      order.isPaid &&
                      !order.isDelivered && (
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button type="button" onClick={onMarkAsDelivered}>
                              Mark As Delivered
                            </Button>
                          </div>
                        </ListGroup.Item>
                      )}
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default OrderScreen;
