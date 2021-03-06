import styled from 'styled-components';

const Input = styled.input`
  width: 326px;
  height: 58px;
  border-radius: 5px;
  border: ${(props) => (props.error ? '2px solid red' : 'none')};
  padding-left: ${(props) => (props.error ? '13px' : '15px')};
  font-size: 20px;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: black;
    font-weight: 400;
  }
`;

export default Input;
