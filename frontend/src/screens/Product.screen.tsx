import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import noProduct from "../assets/images/no_product.svg";
import RatingComponent from "../components/Rating.component";
import { useGetSingleProductQuery } from "../store/slices/productsApiSlice";
import { getError } from "../helpers/utils";
import LoaderComponent from "../components/Loader.component";
import MessageComponent from "../components/Message.component";
import { addToCart } from "../store/slices/cartSlice";
import { useAppDispatch } from "../store/hooks";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetSingleProductQuery(`${productId}`);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : isError ? (
        <MessageComponent variant="danger">{getError(error)}</MessageComponent>
      ) : (
        product && (
          <>
            <Link to="/" className="btn btn-light my-3">
              <div className="d-flex align-items-center">
                <FaArrowLeft />
                <span className="ms-2">Go Back</span>
              </div>
            </Link>
            <Row>
              <Col md={5}>
                <Image src={noProduct} alt={product.name} fluid />
              </Col>
              <Col md={4}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <RatingComponent
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>${product.price}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          <strong>
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                    {product.countInStock > 0 && (
                      <ListGroup.Item>
                        <Row>
                          <Col>Quantity</Col>
                          <Col>
                            <Form.Control
                              as="select"
                              value={quantity}
                              onChange={(e) =>
                                setQuantity(Number(e.target.value))
                              }
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (qty) => (
                                  <option key={qty + 1} value={qty + 1}>
                                    {qty + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
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

export default ProductScreen;
