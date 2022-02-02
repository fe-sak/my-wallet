import styled from 'styled-components';

export default function PageContainer({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #915fbf;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 13px;
`;
