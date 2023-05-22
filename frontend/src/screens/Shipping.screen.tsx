import { Button } from "react-bootstrap";
import FormContainerComponent from "../components/Forms/FormContainer.component";
import FormComponent from "../components/Forms/Form.component";
import FormFieldComponent from "../components/Forms/FormField.component";
import * as Yup from "yup";
import { ShippingAddress } from "../interfaces/order.interface";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { saveShippingAddress } from "../store/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  address: Yup.string().required().label("Address"),
  city: Yup.string().required().label("City"),
  postalCode: Yup.string()
    .required()
    .length(5)
    .matches(/^[0-9]{5}/, "Postal code must be only numbers")
    .label("Postal Code"),
  country: Yup.string().required().label("Country"),
});

const ShippingScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { shippingAddress } = useAppSelector((state) => state.cart);

  const initialValues = {
    address: shippingAddress?.address || "",
    city: shippingAddress?.city || "",
    postalCode: shippingAddress?.postalCode || "",
    country: shippingAddress?.country || "",
  };

  const onSubmit = (data: ShippingAddress) => {
    dispatch(saveShippingAddress(data));
    navigate("/payment");
  };

  return (
    <FormContainerComponent>
      <h1>Shipping Address</h1>
      <FormComponent
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <FormFieldComponent
          name="address"
          placeholder="Enter address"
          label="Address"
        />
        <FormFieldComponent name="city" placeholder="Enter city" label="City" />
        <FormFieldComponent
          name="postalCode"
          placeholder="Enter postal code"
          label="Postal Code"
        />
        <FormFieldComponent
          name="country"
          placeholder="Enter country"
          label="Country"
        />
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          //   disabled={isLoading}
        >
          Continue
        </Button>
      </FormComponent>
    </FormContainerComponent>
  );
};

export default ShippingScreen;
