import logo from '../../assets/MyWallet.svg';
import { Form, Input } from '../../components/FormComponents';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { required, maxLength, pattern } from '../../utils/reactHookFormConfig';
import { services } from '../../services/services';
import { toastError } from '../../components/toasts';
import StyledLink from '../../components/StyledLink';
import Button from '../../components/Button';
import AuthContext from '../../contexts/AuthContext';
import SiteLogo from '../../components/SiteLogo';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { auth, login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    if (auth) navigate('/transactions');
  }, [auth, navigate]);

  async function submitForm(formData) {
    try {
      setIsLoading(true);

      const { data: token } = await services.login({ ...formData });

      login(token);

      setTimeout(() => {
        setIsLoading(false);
        navigate('/transactions');
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      toastError('Usuário e/ou senha errados');
    }
  }

  return (
    <>
      <SiteLogo src={logo} alt='site logo' />
      <Form onSubmit={handleSubmit((formData) => submitForm(formData))}>
        <p>{errors?.name?.message}</p>
        <Input
          type='text'
          placeholder='Email'
          disabled={isLoading}
          autoComplete='off'
          error={errors?.email?.message ? true : false}
          {...register('email', {
            required,
            maxLength,
            pattern,
          })}
        />
        <p>{errors?.email?.message}</p>

        <Input
          type='password'
          placeholder='Senha'
          error={errors?.password?.message ? true : false}
          {...register('password', {
            required,
          })}
          disabled={isLoading}
        />
        <p>{errors?.password?.message}</p>

        <Button type='submit'>
          {isLoading ? (
            <ThreeDots color='#FFFFFF' height={50} width={50} />
          ) : (
            'Entrar'
          )}
        </Button>
      </Form>
      <StyledLink to='/signup'>Primeira vez? Cadastre-se!</StyledLink>
    </>
  );
}
