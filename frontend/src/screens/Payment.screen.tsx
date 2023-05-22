import { Button, Col, Form } from "react-bootstrap";
import CheckoutStepsComponent from "../components/CheckoutSteps.component";
import FormComponent from "../components/Forms/Form.component";
import FormContainerComponent from "../components/Forms/FormContainer.component";
import { Field, FieldProps } from "formik";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useEffect } from "react";
import { savePaymentMethod } from "../store/slices/cartSlice";

const FormCheck = ({ field }: FieldProps) => {
  return (
    <Form.Check
      {...field}
      type="radio"
      className="my-2"
      label="PayPal"
      id="PayPal"
      checked={field.value}
    />
  );
};

const PaymentScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { shippingAddress } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const onSubmit = (data: { paypal: boolean }) => {
    const payload = data.paypal ? "PayPal" : null;
    dispatch(savePaymentMethod(payload));
    navigate("/placeorder");
  };

  return (
    <FormContainerComponent>
      <CheckoutStepsComponent step1 step2 step3 />
      <h1>Payment Method</h1>
      <FormComponent initialValues={{ paypal: true }} onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Field name="paypal" component={FormCheck} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-2">
          Continue
        </Button>
      </FormComponent>
    </FormContainerComponent>
  );
};

export default PaymentScreen;
