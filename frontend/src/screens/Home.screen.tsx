import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import ProductComponent from "../components/Product.component";
import { Product } from "../interfaces/product.interface";

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get<Product[]>("/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductComponent product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
