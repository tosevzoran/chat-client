import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 0.5rem 0.75rem;
`;

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  type = 'text',
  ...props
}) => {
  return <StyledInput type={type} {...props} />;
};

export default Input;
