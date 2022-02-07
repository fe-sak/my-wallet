import styled from 'styled-components';
import income from '../assets/addIncome.svg';
import expense from '../assets/addExpense.svg';
import { useNavigate } from 'react-router-dom';

export default function TransactionsButtons() {
  const navigate = useNavigate();
  return (
    <Container>
      <Button onClick={() => navigate('/income')}>
        <img src={income} alt='add income' />
        <span>
          Nova <br />
          entrada
        </span>
      </Button>
      <Button onClick={() => navigate('/expense')}>
        <img src={expense} alt='add expense' />
        <span>
          Nova <br />
          saída
        </span>
      </Button>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  height: 14%;
  z-index: 10;
  bottom: 16px;
  left: 24px;
  right: 24px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.div`
  background-color: lightblue;
  width: 49%;
  height: 100%;
  background: #a328d6;
  border-radius: 5px;
  position: relative;

  img {
    position: absolute;
    top: 9px;
    left: 10px;
  }

  span {
    font: 700 17px 'raleway';
    color: white;
    position: absolute;
    bottom: 9px;
    left: 10px;
  }
`;
