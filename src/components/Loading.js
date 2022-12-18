import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  margin-left: 1rem;
`;

const Loading = () => {
  return (
    <LoadingWrapper>
      <Spinner />
      <LoadingText>Loading...</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;
