import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../components/Product';

const ProductPage = () => {
  const { productId } = useParams();
  return <Product id={productId} />;
};

export default ProductPage;
