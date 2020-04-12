import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  outline: none;
  border: none;
  margin: 0;
  padding: 0;
  color: inherit;
  font: inherit;
  line-height: normal;
  background: transparent;
  cursor: pointer;
`;

const Base: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  type = 'button',
  ...props
}) => (
  <StyledButton type={type} {...props}>
    {children}
  </StyledButton>
);

export default Base;
