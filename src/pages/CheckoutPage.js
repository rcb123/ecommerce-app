import React, { useEffect, useState } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_CART_ITEMS, REMOVE_FROM_CART, CREATE_ORDER, GET_ORDER } from '../queries';
import Loading from '../components/Loading';
import Error from '../components/Error';

function CheckoutPage() {
  const client = useApolloClient();
  const navigate = useNavigate();
  const { id: orderId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    update(cache, { data: { removeFromCart } }) {
      const { cartItems } = cache.readQuery({ query: GET_CART_ITEMS });
      cache.writeQuery({
        query: GET_CART_ITEMS,
        data: {
          cartItems: cartItems.filter(item => item.id !== removeFromCart.id),
        },
      });
    },
  });

  const [createOrder] = useMutation(CREATE_ORDER, {
    update(cache, { data: { createOrder } }) {
        cache.writeData({ data: { cartOpen: false } });
        navigate(`/order/${createOrder.id}`);
    },
  });

  useEffect(() => {
    if (orderId) {
      setLoading(true);
      client
        .query({
          query: GET_ORDER,
          variables: { id: orderId },
        })
        .then(({ data }) => {
          setName(data.order.name);
          setEmail(data.order.email);
          setLoading(false);
        })
        .catch(err => {
          setError(err);
          setLoading(false);
        });
    }
  }, [client, orderId]);
  
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  
  const { cartItems } = client.readQuery({ query: GET_CART_ITEMS });
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  
  const handleSubmit = event => {
    event.preventDefault();
    createOrder({ variables: { name, email } });
  };
  
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.imageUrl} alt={item.name} />
          <div className="item-details">
            <span className="name">{item.name}</span>
            <span className="price">
              {item.quantity} x ${item.price}
            </span>
            <button
              onClick={() => removeFromCart({ variables: { id: item.id } })}
            >
              &#10005;
            </button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>TOTAL: ${total}</span>
      </div>
      {!orderId && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Place Order'}
          </button>
        </form>
      )}
    </div>
  );
}

export default CheckoutPage