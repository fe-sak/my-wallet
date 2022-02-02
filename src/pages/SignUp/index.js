import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import 'react-toastify/dist/ReactToastify.css';
import { toastError, toastSuccess } from '../../components/toasts';
import StyledLink from '../../components/StyledLink';
import logo from '../../assets/MyWallet.svg';
import { Form, Input } from '../../components/FormComponents';
import Button from '../../components/Button';
import { services } from '../../services/services';
import {
  required,
  maxLength,
  minLength,
  pattern,
} from '../../utils/reactHookFormConfig';
import SiteLogo from '../../components/SiteLogo';

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function submitForm(formData) {
    try {
      setIsLoading(true);
      await services.signUp({ ...formData });
      setIsLoading(false);
      toastSuccess('Usuário criado! Entrando na página de login...');
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      setIsLoading(false);
      toastError(error.response.data);
    }
  }

  const password = watch('password');

  return (
    <>
      <SiteLogo src={logo} alt='site logo' />
      <Form onSubmit={handleSubmit((formData) => submitForm(formData))}>
        <Input
          type='text'
          placeholder='Nome'
          disabled={isLoading}
          autoComplete='off'
          error={errors?.name?.message ? true : false}
          {...register('name', {
            required,
            maxLength,
          })}
        />
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
            minLength,
          })}
          disabled={isLoading}
        />
        <p>{errors?.password?.message}</p>

        <Input
          type='password'
          placeholder='Confirme a senha'
          error={errors?.confirmPassword?.message ? true : false}
          {...register('confirmPassword', {
            required,
            minLength,
            validate: (confirmPassword) =>
              password === confirmPassword || 'As senhas não são iguais',
          })}
          disabled={isLoading}
        />
        <p>{errors?.confirmPassword?.message}</p>
        <Button type='submit'>
          {isLoading ? (
            <ThreeDots color='#FFFFFF' height={50} width={50} />
          ) : (
            'Cadastrar'
          )}
        </Button>
      </Form>
      <StyledLink to='/'>Já tem uma conta? Entre agora!</StyledLink>
    </>
  );
}
