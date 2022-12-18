import React from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!) {
    addToCart(productId: $productId) @client
  }
`;

function Product({ id, name, price, imageUrl }) {
  const [addToCart] = useMutation(ADD_TO_CART);

  return (
    <div>
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p>${price}</p>
      <button onClick={() => addToCart({ variables: { productId: id } })}>
        Add to Cart
      </button>
    </div>
  );
}

export default Product;
