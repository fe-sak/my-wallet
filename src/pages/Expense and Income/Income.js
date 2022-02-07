import { useForm } from 'react-hook-form';
import Form from '../../components/FormComponents/Form.js';
import Input from '../../components/FormComponents/Input.js';
import Header from '../../components/Header.js';
import { Container, HeaderSpan } from './style.js';
import { required, maxLength } from '../../utils/reactHookFormConfig';
import { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import { toastError } from '../../components/toasts.js';
import { services } from '../../services/services.js';
import { ThreeDots } from 'react-loader-spinner';
import Button from '../../components/Button.js';

export default function Income() {
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
      await services.addIncome(auth, { ...formData });
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
        <HeaderSpan>Nova entrada</HeaderSpan>
      </Header>
      <Form onSubmit={handleSubmit((formData) => submitForm(formData))}>
        <Input
          type='number'
          min='0.01'
          step='any'
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
            'Salvar entrada'
          )}
        </Button>
      </Form>
    </Container>
  );
}
