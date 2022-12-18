import { gql } from '@apollo/client';

export const GET_CART_ITEMS = gql`
  query GetCartItems {
    cartItems {
      id
      name
      price
      imageUrl
      quantity
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($id: ID!) {
    removeFromCart(id: $id)
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder($name: String!, $email: String!) {
    createOrder(name: $name, email: $email) {
      id
      name
      email
      items {
        id
        name
        price
        quantity
      }
      total
      createdAt
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id:ID!) {
    order(id: $id) {
        name
        email
    }
  }
`;