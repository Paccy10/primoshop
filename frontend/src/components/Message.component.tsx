import { PropsWithChildren } from "react";
import { Alert } from "react-bootstrap";

type Variant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

interface Props {
  variant: Variant;
}

const MessageComponent = ({
  variant = "info",
  children,
}: PropsWithChildren<Props>) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default MessageComponent;
