import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/products/:productId" component={ProductPage} />
    <Route path="/cart" component={CartPage} />
  </Switch>
);

export default Routes;
