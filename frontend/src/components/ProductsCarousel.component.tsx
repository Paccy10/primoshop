import { Carousel, Image } from "react-bootstrap";
import { getError } from "../helpers/utils";
import { useGetTopProductsQuery } from "../store/slices/productsApiSlice";
import LoaderComponent from "./Loader.component";
import MessageComponent from "./Message.component";
import { Link } from "react-router-dom";

const ProductsCarouselComponent = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <LoaderComponent />
  ) : error ? (
    <MessageComponent variant="danger">{getError(error)}</MessageComponent>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products &&
        products?.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/products/${product._id}`}>
              <Image src={product.image} alt={product.name} fluid />
              <Carousel.Caption className="carousel-cation">
                <h2>
                  {product.name} (${product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default ProductsCarouselComponent;
