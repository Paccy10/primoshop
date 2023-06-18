import { Row, Col } from "react-bootstrap";
import ProductComponent from "../components/Product.component";
import { useGetProductsQuery } from "../store/slices/productsApiSlice";
import { getError } from "../helpers/utils";
import LoaderComponent from "../components/Loader.component";
import MessageComponent from "../components/Message.component";
import Paginator from "../components/Paginator";
import { useParams } from "react-router-dom";

const HomeScreen = () => {
  const params = useParams();
  const page = params.page ? Number(params.page) : 1;
  const { data, isLoading, isError, error } = useGetProductsQuery({
    page,
    pageSize: 20,
  });
  const products = data ? data.products : [];

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
          <Paginator pages={data?.pages || 0} page={page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
