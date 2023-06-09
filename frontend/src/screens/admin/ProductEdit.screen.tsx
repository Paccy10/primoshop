import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import MessageComponent from "../../components/Message.component";
import LoaderComponent from "../../components/Loader.component";
import { toast } from "react-toastify";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../store/slices/productsApiSlice";
import * as Yup from "yup";
import { FaArrowLeft } from "react-icons/fa";
import FormContainerComponent from "../../components/Forms/FormContainer.component";
import { getError } from "../../helpers/utils";
import FormComponent from "../../components/Forms/Form.component";
import { ProductInput } from "../../interfaces/product.interface";
import FormFieldComponent from "../../components/Forms/FormField.component";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  price: Yup.number().positive().required().label("Price"),
  image: Yup.string().required().label("Image"),
  brand: Yup.string().required().label("Brand"),
  category: Yup.string().required().label("Category"),
  countInStock: Yup.number()
    .integer()
    .positive()
    .required()
    .label("Count In Stock"),
  description: Yup.string().required().label("Description"),
});

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const {
    data: product,
    isLoading,
    error,
  } = useGetSingleProductQuery(`${productId}`);
  const [updateProduct, { isLoading: editingProduct }] =
    useUpdateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductInput) => {
    try {
      await updateProduct({ data, productId: `${productId}` }).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (error: any) {
      toast.error(error.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/products" className="btn btn btn-light my-3">
        <FaArrowLeft /> <span className="ms-2">Go Back</span>
      </Link>
      <FormContainerComponent>
        <h1>Edit Product</h1>
        {editingProduct && <LoaderComponent />}
        {isLoading ? (
          <LoaderComponent />
        ) : error ? (
          <MessageComponent variant="danger">
            {getError(error)}
          </MessageComponent>
        ) : (
          <>
            <FormComponent
              initialValues={{
                name: product?.name || "",
                price: product?.price || 0,
                image: product?.image || "",
                brand: product?.brand || "",
                category: product?.category || "",
                countInStock: product?.countInStock || 0,
                description: product?.description || "",
              }}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              <FormFieldComponent
                name="name"
                label="Name"
                placeholder="Enter name"
              />
              <FormFieldComponent
                name="price"
                type="number"
                label="Price"
                placeholder="Enter price"
              />
              <FormFieldComponent
                name="brand"
                label="Brand"
                placeholder="Enter brand"
              />
              <FormFieldComponent
                name="category"
                label="Category"
                placeholder="Enter category"
              />
              <FormFieldComponent
                type="number"
                name="countInStock"
                label="Count In Stock"
                placeholder="Enter count in stock"
              />
              <FormFieldComponent
                name="description"
                label="Description"
                placeholder="Enter description"
              />
              <Button
                type="submit"
                variant="primary"
                className="mt-2"
                disabled={editingProduct}
              >
                Update
              </Button>
            </FormComponent>
          </>
        )}
      </FormContainerComponent>
    </>
  );
};

export default ProductEditScreen;
