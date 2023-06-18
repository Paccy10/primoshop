import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

interface Props {
  pages: number;
  page: number;
  isAdmin?: boolean;
  keyword?: string;
}

const Paginator = ({ pages, page, keyword, isAdmin = false }: Props) => {
  return pages > 1 ? (
    <Pagination>
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer
          key={x + 1}
          to={
            !isAdmin
              ? keyword
                ? `/search/${keyword}/page/${x + 1}`
                : `/page/${x + 1}`
              : `/admin/products/page/${x + 1}`
          }
        >
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  ) : null;
};

export default Paginator;
