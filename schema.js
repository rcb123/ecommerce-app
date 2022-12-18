const { gql } = require('apollo-server');

const typeDefs = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    imageUrl: String!
    description: String!
  }

  type CartItem {
    product: Product!
    quantity: Int!
  }

  type Order {
    id: ID!
    name: String!
    email: String!
    items: [Product]
    total: Int!
    createdAt: String!
  }

  type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  type Mutation {
    addProduct(
      name: String!
      price: Float!
      imageUrl: String!
      description: String!
    ): Product!
    updateProduct(
      id: ID!
      name: String
      price: Float
      imageUrl: String
      description: String
    ): Product!
    deleteProduct(id: ID!): Product!
    addToCart(productId: ID!, quantity: Int!): CartItem!
    updateCartItem(productId: ID!, quantity: Int!): CartItem!
    removeFromCart(productId: ID!): CartItem!
  }
`;

module.exports = typeDefs;