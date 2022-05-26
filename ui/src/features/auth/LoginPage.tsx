import styled from '@emotion/styled';
import { Drawer, Typography } from '@mui/material';
import { LoginForm } from 'features/auth/LoginForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 32px;
`;

export const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => setOpen(true), []);

  const onClose = () => setOpen(false);

  const goBack = () => navigate(-1);

  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={onClose}
      SlideProps={{ onExited: goBack }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Вход
        </Typography>
        <LoginForm />
      </Container>
    </Drawer>
  );
};
