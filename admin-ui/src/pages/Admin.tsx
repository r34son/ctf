import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { TimerControl } from 'components/controls/TimerControl';
import { CreateTeamForm } from 'components/forms/CreateTeamForm';
import { UpsertTaskForm } from 'components/forms/UpsertTaskForm';
import { useState } from 'react';

enum Forms {
  TEAM,
  TASK,
}

export const AdminPage = () => {
  const [expandedForm, setExpandedForm] = useState<Forms>(Forms.TEAM);

  const makeOnChange = (form: Forms) => () => setExpandedForm(form);

  return (
    <Container>
      <Grid container spacing={2} p={2}>
        <Grid item xs={12}>
          <TimerControl />
        </Grid>
        <Grid item xs={4}>
          <Accordion
            expanded={expandedForm === Forms.TEAM}
            onChange={makeOnChange(Forms.TEAM)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Create team</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CreateTeamForm />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expandedForm === Forms.TASK}
            onChange={makeOnChange(Forms.TASK)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Create task</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <UpsertTaskForm />
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </Container>
  );
};
