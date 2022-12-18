const Product = require('./models/Product');

module.exports = {
  Query: {
    products: () => Product.find(),
    product: (_, { id }) => Product.findById(id),
  },
  Mutation: {
    addProduct: (_, product) => Product.create(product),
    updateProduct: (_, { id, ...rest }) =>
      Product.findByIdAndUpdate(id, rest, { new: true }),
    deleteProduct: async (_, { id }) => {
      const product = await Product.findById(id);
      await product.remove();
      return product;
    },
  },
};
