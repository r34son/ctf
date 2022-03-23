import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { LoginForm } from 'components/LoginForm';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 400px;
  height: 100%;
  margin: auto;
`;

export const LoginPage = () => (
  <Container>
    <Typography variant="h4" gutterBottom>
      Login
    </Typography>
    <LoginForm />
  </Container>
);
