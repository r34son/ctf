import styled from '@emotion/styled';
import { Container } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { authSelector } from 'features/auth/authSlice';
import { Outlet } from 'react-router-dom';
import { AppBar } from './AppBar';
import { Breadcrumbs } from './Breadcrumbs';
import { MenuDrawer } from './MenuDrawer';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Content = styled.div`
  margin-top: 16px;
  flex: 1;
`;

export const Layout = () => {
  const auth = useAppSelector(authSelector);

  return (
    <AppContainer>
      <AppBar />
      <MainWrapper>
        {auth.isAuthorized && <MenuDrawer />}
        <Container
          disableGutters
          fixed
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            flex: 1,
            overflowY: 'hidden',
          }}
        >
          {auth.isAuthorized && <Breadcrumbs />}
          <Content>
            <Outlet />
          </Content>
        </Container>
      </MainWrapper>
    </AppContainer>
  );
};
