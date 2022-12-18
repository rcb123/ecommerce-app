import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #333;
  color: #fff;
`;

const NavbarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <NavbarWrapper>
      <NavbarLink to="/">Home</NavbarLink>
      <NavbarLink to="/cart">Cart</NavbarLink>
      <NavbarLink to="/checkout">Checkout</NavbarLink>
    </NavbarWrapper>
  );
};

export default Navbar;
