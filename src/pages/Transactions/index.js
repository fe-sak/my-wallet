import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../contexts/AuthContext.js';
import { services } from '../../services/services.js';
import logoutIcon from '../../assets/logoutIcon.svg';
import { toastSuccess } from '../../components/toasts.js';
import { useNavigate } from 'react-router-dom';
import formatToMoney from '../../utils/formatToMoney.js';
import {
  Container,
  TransactionsContainer,
  TransactionsFooter,
  Entries,
  Entry,
} from './style.js';
import TransactionsButtons from '../../components/IncomeExpenseButtons.js';
import Header from '../../components/Header.js';

export default function Transactions() {
  const [balance, setBalance] = useState();
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  let balanceValue = 0;

  const name = balance?.user.name;
  const transactions = balance?.transactions;
  const isEmpty = transactions?.length === 0;
  if (transactions)
    transactions.forEach((transaction) => {
      balanceValue += transaction.value;
    });

  useEffect(() => {
    async function getUser() {
      const res = await services.getUser(auth);
      setBalance({ ...res.data });
    }
    getUser();
  }, [auth]);

  function exit() {
    toastSuccess('Saindo...', 2300);
    setTimeout(() => {
      logout();
      navigate('/');
    }, 3000);
  }
  console.log(balance);

  if (!balance) return '';
  return (
    <Container>
      <Header>
        <span>{`Olá, ${name.split(' ')[0]}`}</span>
        <img src={logoutIcon} alt='logout' onClick={exit} />
      </Header>
      <TransactionsContainer isEmpty={isEmpty}>
        {transactions.length === 0 && (
          <span id='noTransactions'>Não há registros de entrada ou saída</span>
        )}
        {transactions.length > 0 && (
          <>
            <Entries>
              {transactions.map((transaction) => (
                <Entry
                  positive={transaction.value > 0 && true}
                  key={transaction._id}
                >
                  <span className='date'>{transaction.date}</span>
                  <span className='description'>{transaction.description}</span>
                  <span className='value'>
                    {formatToMoney(transaction.value)}
                  </span>
                </Entry>
              ))}
            </Entries>
            <TransactionsFooter positive={balanceValue >= 0 && true}>
              <span id='balance'>saldo</span>
              <span id='balanceValue'>
                {formatToMoney(balanceValue && balanceValue)}
              </span>
            </TransactionsFooter>
          </>
        )}
      </TransactionsContainer>
      <TransactionsButtons />
    </Container>
  );
}
