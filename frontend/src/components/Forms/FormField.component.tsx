import { Field, FieldProps } from "formik";
import { Form } from "react-bootstrap";

type Type = "text" | "email" | "number" | "password" | "file";

interface FormFieldProps extends FieldProps {
  label?: string;
  placeholder?: string;
  type?: Type;
}

interface FormFieldComponentProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: Type;
}

const FormField = ({
  field,
  form,
  label,
  placeholder,
  type = "text",
}: FormFieldProps) => {
  const { name } = field;
  const { errors, touched } = form;
  const hasError = errors[name] && touched[name];

  return (
    <Form.Group controlId={name} className="my-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...field}
        type={type}
        placeholder={placeholder}
        isInvalid={!!hasError}
      />
      {hasError && (
        <Form.Control.Feedback type="invalid">
          {String(errors[name])}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

const FormFieldComponent = ({
  name,
  type,
  label,
  placeholder,
}: FormFieldComponentProps) => {
  return (
    <Field
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      component={FormField}
    />
  );
};

export default FormFieldComponent;
