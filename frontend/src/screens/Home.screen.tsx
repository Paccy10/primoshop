import { Row, Col } from "react-bootstrap";
import ProductComponent from "../components/Product.component";
import { useGetProductsQuery } from "../store/slices/productsApiSlice";
import { getError } from "../helpers/utils";
import LoaderComponent from "../components/Loader.component";
import MessageComponent from "../components/Message.component";

const HomeScreen = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <LoaderComponent />
      ) : isError ? (
        <MessageComponent variant="danger">{getError(error)}</MessageComponent>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <ProductComponent product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
