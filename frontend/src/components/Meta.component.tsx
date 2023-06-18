import { Helmet } from "react-helmet-async";

interface Props {
  title: string;
  description: string;
  keywords?: string;
}

const MetaComponent = ({ title, description, keywords }: Props) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

MetaComponent.defaultProps = {
  title: "Welcome to Primoshop",
  description: "We sell the best products for cheap",
  keywords: "electronics, buy electronics, cheap electronics",
};

export default MetaComponent;
