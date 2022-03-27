import { Container, Grid } from '@mui/material';
import { TimerControl } from 'components/TimerControl';

export const AdminPage = () => (
  <Container>
    <Grid container spacing={2} p={2}>
      <Grid item xs={12}>
        <TimerControl />
      </Grid>
    </Grid>
  </Container>
);
