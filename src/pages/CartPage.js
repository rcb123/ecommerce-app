import React from 'react';
import { gql, useQuery } from '@apollo/client';

import CartPage from '../components/Cart';
import Loading from '../components/Loading';
import Error from '../components/Error';

const GET_CART_ITEMS_COUNT = gql`
  query GetCartItemsCount {
    cartItemsCount
  }
`;

function CartPageContainer() {
  const { data, loading, error } = useQuery(GET_CART_ITEMS_COUNT);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return data.cartItemsCount > 0 ? <CartPage /> : <p>Your cart is empty</p>;
}

export default CartPageContainer;