import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import MessageComponent from "../../components/Message.component";
import LoaderComponent from "../../components/Loader.component";
import { useGetProductsQuery } from "../../store/slices/productsApiSlice";
import { getError } from "../../helpers/utils";

const ProductsListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button>
            <FaEdit /> New Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <LoaderComponent />
      ) : error ? (
        <MessageComponent variant="danger">{getError(error)}</MessageComponent>
      ) : (
        <>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/products/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button variant="danger" className="btn-sm mx-2">
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default ProductsListScreen;
