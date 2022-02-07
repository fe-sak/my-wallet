import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const TransactionsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 70vh;
  margin-top: 22px;
  background: #ffffff;
  border-radius: 5px;

  ${(props) =>
    props.isEmpty &&
    `display: flex;
     justify-content: center;
     align-items: center;`}
  #noTransactions {
    color: #868686;
    font: 400 20px 'raleway';
    width: 180px;
    height: 46px;
    text-align: center;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Entries = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 10px 50px 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
const Entry = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;

  .date {
    font: 400 16px 'raleway';
    color: #c6c6c6;
    margin-right: 10px;
  }

  .description {
    font: 400 16px 'raleway';
    color: black;
    width: 60%;
    word-break: break-word;
  }

  .value {
    color: ${(props) => (props.positive ? '#03AC00' : '#C70000')};
    position: absolute;
    right: 0;
  }
`;
const TransactionsFooter = styled.div`
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  #balance {
    font: 700 17px 'raleway';
    text-transform: uppercase;
  }

  #balanceValue {
    font: 400 17px 'raleway';
    color: ${(props) => (props.positive ? '#03AC00' : '#C70000')};
  }
`;

const IncomeExpenseButtonsContainer = styled.div`
  position: fixed;
  height: 15%;
  z-index: 10;
  bottom: 0;
  left: 24px;
  right: 24px;
  background-color: blue;
`;

export {
  Container,
  TransactionsContainer,
  TransactionsFooter,
  Entries,
  Entry,
  IncomeExpenseButtonsContainer,
};
