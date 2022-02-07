import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { required, maxLength } from '../../utils/reactHookFormConfig';
import { ThreeDots } from 'react-loader-spinner';
import AuthContext from '../../contexts/AuthContext.js';
import { services } from '../../services/services.js';
import { Container, HeaderSpan } from './style.js';
import { Header, Button, Form, Input, toastError } from '../../components';

export default function Expense() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: '',
      description: '',
    },
  });

  async function submitForm(formData) {
    try {
      setIsLoading(true);
      await services.addExpense(auth, { ...formData });
      setIsLoading(false);
      setTimeout(() => {
        navigate('/transactions');
      }, 300);
    } catch (error) {
      setIsLoading(false);
      toastError(error.response.data);
    }
  }

  return (
    <Container>
      <Header>
        <HeaderSpan>Nova saída</HeaderSpan>
      </Header>
      <Form onSubmit={handleSubmit((formData) => submitForm(formData))}>
        <Input
          type='number'
          placeholder='Valor'
          disabled={isLoading}
          autoComplete='off'
          error={errors?.value?.message ? true : false}
          {...register('value', {
            required,
            maxLength,
          })}
        />
        <p>{errors?.value?.message}</p>

        <Input
          type='text'
          placeholder='Descrição'
          disabled={isLoading}
          autoComplete='off'
          error={errors?.description?.message ? true : false}
          {...register('description', {
            required,
            maxLength,
          })}
        />
        <p>{errors?.description?.message}</p>
        <Button type='submit'>
          {isLoading ? (
            <ThreeDots color='#FFFFFF' height={50} width={50} />
          ) : (
            'Salvar saída'
          )}
        </Button>
      </Form>
    </Container>
  );
}
