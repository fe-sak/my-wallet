import logo from '../../assets/MyWallet.svg';
import styled from 'styled-components';
import { Form, Input } from '../../components/FormComponents';

export default function Login() {
  return (
    <>
      <StyledImg src={logo} alt='site logo' />
      <Form onSubmit={() => alert('A')}>
        <Input
          type='email'
          placeholder='email'
          name='email'
          // onChange={handleChange}
          // value={formData.password}
          // disabled={isLoading}
          autoComplete='off'
          required
        />

        <Input
          type='password'
          placeholder='senha'
          name='password'
          // onChange={handleChange}
          // value={formData.password}
          // disabled={isLoading}
          required
        />
      </Form>
    </>
  );
}

const StyledImg = styled.img`
  width: 147px;
  height: 50px;
  margin: 0 auto;
`;
