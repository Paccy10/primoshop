import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import "./assets/styles/bootstrap.custom.css";
import "./assets/styles/index.css";
import App from "./App";
import HomeScreen from "./screens/Home.screen";
import ProductScreen from "./screens/Product.screen";
import store from "./store";
import CartScreen from "./screens/Cart.screen";
import LoginScreen from "./screens/Login.screen";
import RegisterScreen from "./screens/Register.screen";
import ShippingScreen from "./screens/Shipping.screen";
import PrivateRouteComponent from "./components/PrivateRoute.component";
import PaymentScreen from "./screens/Payment.screen";
import PlaceOrderScreen from "./screens/PlaceOrder.screen";
import OrderScreen from "./screens/Order.screen";
import ProfileScreen from "./screens/Profile.screen";
import AdminRouteComponent from "./components/AdminRoute.component copy";
import OrdersListScreen from "./screens/admin/OrdersList.screen";
import ProductsListScreen from "./screens/admin/ProductsList.screen";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/products/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRouteComponent />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/orders/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="" element={<AdminRouteComponent />}>
          <Route path="/admin/orders" element={<OrdersListScreen />} />
          <Route path="/admin/products" element={<ProductsListScreen />} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <PayPalScriptProvider
      deferLoading={true}
      options={{ "client-id": `${process.env.REACT_APP_PAYPAL_CLIENT_ID}` }}
    >
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
