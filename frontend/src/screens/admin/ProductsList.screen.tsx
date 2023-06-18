import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import MessageComponent from "../../components/Message.component";
import LoaderComponent from "../../components/Loader.component";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../store/slices/productsApiSlice";
import { getError } from "../../helpers/utils";
import { toast } from "react-toastify";

const ProductsListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: creatingProduct }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: deletingProduct }] =
    useDeleteProductMutation();

  const onCreateProduct = async () => {
    if (window.confirm("Are you sure you want to create a new product")) {
      try {
        await createProduct();
        refetch();
      } catch (error: any) {
        toast.error(error.data?.message || error.error);
      }
    }
  };

  const onDeleteProduct = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(id).unwrap();
        refetch();
        toast.success(res.message);
      } catch (error: any) {
        toast.error(error.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <div>
            <Button onClick={onCreateProduct}>
              <FaEdit /> New Product
            </Button>
          </div>
        </Col>
      </Row>
      {creatingProduct && <LoaderComponent />}
      {deletingProduct && <LoaderComponent />}
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
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                    <td>
                      <LinkContainer to={`/admin/products/${product._id}/edit`}>
                        <Button variant="light" className="btn-sm mx-2">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm mx-2"
                        onClick={() => onDeleteProduct(product._id)}
                      >
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
