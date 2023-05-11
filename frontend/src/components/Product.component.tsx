import { Card } from "react-bootstrap";
import noProduct from "../assets/images/no_product.svg";
import { Product } from "../interfaces/product.interface";

interface Props {
  product: Product;
}

const ProductComponent = ({ product }: Props) => {
  return (
    <Card className="my-3 p-3 rounded">
      <a href={`/products/${product._id}`}>
        <Card.Img src={noProduct} variant="top" />
      </a>
      <Card.Body>
        <a href={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductComponent;
