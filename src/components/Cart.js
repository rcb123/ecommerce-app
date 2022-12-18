import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems {
      id
      product {
        id
        name
        price
      }
      quantity
    }
  }
`;

const UPDATE_CART_ITEM_QUANTITY = gql`
  mutation UpdateCartItemQuantity($id: ID!, $quantity: Int!) {
    updateCartItemQuantity(id: $id, quantity: $quantity) {
      id
      quantity
    }
  }
`;

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($id: ID!) {
    removeCartItem(id: $id) {
      id
    }
  }
`;

function CartPage() {
  const { data, loading, error } = useQuery(GET_CART_ITEMS);
  const [updateCartItemQuantity] = useMutation(UPDATE_CART_ITEM_QUANTITY);
  const [removeCartItem] = useMutation(REMOVE_CART_ITEM);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (data && data.cartItems) {
      setItems(data.cartItems);
      setTotal(
        data.cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      );
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleQuantityChange = (id, quantity) => {
    updateCartItemQuantity({ variables: { id, quantity } });
  };

  const handleRemoveItem = (id) => {
    removeCartItem({ variables: { id } });
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.product.name}</td>
              <td>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </td>
              <td>${item.product.price}</td>
              <td>${item.quantity*item.product.price}</td>
              <td>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total: ${total}</p>
    </div>
  );
}

export default CartPage;
