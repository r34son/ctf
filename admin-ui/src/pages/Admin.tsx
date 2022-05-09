import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { TasksControl } from 'components/controls/TasksControl';
import { TimerControl } from 'components/controls/TimerControl';
import { CreateTeamForm } from 'components/forms/CreateTeamForm';
import { UpsertTaskForm } from 'components/forms/UpsertTaskForm';
import { Task } from 'interfaces';
import { useCallback, useEffect, useState } from 'react';
import { getAll } from 'services/api/task';

enum Forms {
  TEAM,
  TASK,
}

export const AdminPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = useCallback(async () => {
    setTasks(await getAll());
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const [expandedForm, setExpandedForm] = useState<Forms>(Forms.TASK);

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
              <UpsertTaskForm onSubmit={fetchTasks} />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={8}>
          <TasksControl tasks={tasks} onEdit={fetchTasks} />
        </Grid>
      </Grid>
    </Container>
  );
};
