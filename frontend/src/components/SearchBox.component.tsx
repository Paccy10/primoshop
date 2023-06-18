import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const SearchBoxComponent = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (keyword?.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={onSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="keword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="submit" variant="outline-light" className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBoxComponent;
