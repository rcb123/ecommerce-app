import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      price
      imageUrl
      description
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      {data.products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
          <img src={product.imageUrl} alt={product.name} />
          <p>{product.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;