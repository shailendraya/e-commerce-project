import "./App.css";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products"
import Search from "./component/Product/Search";
import LoginSignUp from "./component/user/LoginSignUp";
import { loadUser } from "./redux/actions/useActions";
import WebFont from "webfontloader";
import store from "./store";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/user/Profile";
import UpdateProfile from "./component/user/UpdateProfile"
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdatePassword from "./component/user/UpdatePassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import OrderSuccess from "./component/Cart/OrderSuccess";
import Payment from "./component/Cart/Payment";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard"
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

function App() {

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(async () => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    await store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/login" component={LoginSignUp} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/user/update" component={UpdateProfile} />
        <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />

        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />

        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Route exact path="/contact" component={Contact} />

        <Route exact path="/about" component={About} />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
