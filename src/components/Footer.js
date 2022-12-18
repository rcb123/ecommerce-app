import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  padding: 20px 0;
  margin-top: 20px;
`;

const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterLink = styled(Link)`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    color: #777;
  }
`;

const SocialLink = styled.a`
  color: #333;
  font-size: 14px;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    color: #777;
  }
`;

const Footer = () => (
  <FooterContainer>
    <FooterInner>
      <div>
        <FooterLink to="/about">About</FooterLink>
        <FooterLink to="/terms">Terms</FooterLink>
        <FooterLink to="/privacy">Privacy</FooterLink>
      </div>
      <div>
        <SocialLink href="#">Facebook</SocialLink>
        <SocialLink href="#">Twitter</SocialLink>
        <SocialLink href="#">Instagram</SocialLink>
      </div>
    </FooterInner>
  </FooterContainer>
);

export default Footer;
