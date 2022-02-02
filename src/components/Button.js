import styled from 'styled-components';

export default function Button({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

const StyledButton = styled.button`
  width: 326px;
  height: 46px;
  background-color: #a86cd6;
  font: 700 20px 'raleway';
  color: white;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
