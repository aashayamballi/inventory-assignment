import React from "react";

// third party imports
import { Route, Switch } from "react-router-dom";

import ProductList from "../components/inventory/ProductList";
import CreateProduct from "../components/inventory/CreateProduct";
import ProductDetail from "../components/inventory/ProductDetail";
import EditProduct from "../components/inventory/EditProduct";

export default function RenderRoutes() {
  return (
    <Switch>
      <Route path="/" component={ProductList} exact />
      <Route path="/product/create" exact component={CreateProduct} />
      <Route path="/product/:productId" exact component={ProductDetail} />
      <Route path="/product/edit/:productId" exact component={EditProduct} />
      <Route component={() => <h1>Page Not Found!</h1>} />
    </Switch>
  );
}
