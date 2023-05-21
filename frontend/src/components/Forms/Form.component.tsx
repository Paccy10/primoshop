import { Form, Formik, FormikHelpers } from "formik";
import { PropsWithChildren } from "react";

interface Props {
  initialValues: {};
  onSubmit: (
    values: any,
    formikHelpers?: FormikHelpers<{}>
  ) => void | Promise<any>;
  validationSchema?: {};
  autoComplete?: "on" | "off";
}

const FormComponent = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  autoComplete,
}: PropsWithChildren<Props>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => <Form autoComplete={autoComplete}>{children}</Form>}
    </Formik>
  );
};

export default FormComponent;
