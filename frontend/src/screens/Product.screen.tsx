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
import RatingComponent from "../components/Rating.component";
import {
  useGetSingleProductQuery,
  useCreateProductReviewMutation,
} from "../store/slices/productsApiSlice";
import { getError } from "../helpers/utils";
import LoaderComponent from "../components/Loader.component";
import MessageComponent from "../components/Message.component";
import { addToCart } from "../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ReviewInput } from "../interfaces/product.interface";
import { format } from "date-fns";
import { Formik, Form as FormikForm } from "formik";
import MetaComponent from "../components/Meta.component";

const validationSchema = Yup.object().shape({
  rating: Yup.number().positive().required().min(0).max(5).label("Rating"),
});

const ProductScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetSingleProductQuery(`${productId}`);
  const [createProductReview, { isLoading: creatingReview }] =
    useCreateProductReviewMutation();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const onCreateReview = async (data: ReviewInput, helpers: any) => {
    try {
      const res = await createProductReview({
        data,
        productId: `${productId}`,
      }).unwrap();
      refetch();
      helpers.resetForm();
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.data?.message || error.error);
    }
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
            <MetaComponent
              title={product.name}
              description={product.description}
            />
            <Link to="/" className="btn btn-light my-3">
              <div className="d-flex align-items-center">
                <FaArrowLeft />
                <span className="ms-2">Go Back</span>
              </div>
            </Link>
            <Row>
              <Col md={5}>
                <Image src={product.image} alt={product.name} fluid />
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
            <Row className="review">
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && (
                  <MessageComponent>No Reviews</MessageComponent>
                )}
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <RatingComponent value={review.rating} />
                      <p>
                        {format(new Date(review.createdAt), "dd-MMMM-yyyy")}
                      </p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Add a Review</h2>
                    {creatingReview && <LoaderComponent />}
                    {userInfo ? (
                      <Formik
                        initialValues={{ rating: 0, comment: "" }}
                        validationSchema={validationSchema}
                        onSubmit={onCreateReview}
                      >
                        {({ values, setFieldValue }) => (
                          <FormikForm>
                            <Form.Group className="my-2">
                              <Form.Label>Rating</Form.Label>
                              <Form.Control
                                as="select"
                                value={values.rating}
                                onChange={(e) =>
                                  setFieldValue(
                                    "rating",
                                    Number(e.target.value)
                                  )
                                }
                              >
                                <option value="">Select rating...</option>
                                <option value="1">1 - Poor</option>
                                <option value="2">2 - Fair</option>
                                <option value="3">3 - Good</option>
                                <option value="4">4 - Very Good</option>
                                <option value="5">5 - Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group className="my-2">
                              <Form.Label>Comment</Form.Label>
                              <Form.Control
                                as="textarea"
                                value={values.comment}
                                onChange={(e) =>
                                  setFieldValue("comment", e.target.value)
                                }
                              />
                            </Form.Group>
                            <Button
                              type="submit"
                              variant="primary"
                              className="mt-2"
                              disabled={creatingReview}
                            >
                              Submit
                            </Button>
                          </FormikForm>
                        )}
                      </Formik>
                    ) : (
                      <MessageComponent>
                        Please <Link to="/login">sign in</Link> to write a
                        review
                      </MessageComponent>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      )}
    </>
  );
};

export default ProductScreen;
