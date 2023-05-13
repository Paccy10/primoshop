import { Spinner } from "react-bootstrap";

const LoaderComponent = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: "50px",
        height: "50px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default LoaderComponent;
