import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import {
  Chip,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { Rating } from 'common/interfaces';
import { formatUnix } from 'common/utils';
import { useState } from 'react';
import { ratingSelector } from './ratingSlice';

interface ExpandableRowProps {
  data: Rating;
}

const ExpandableRow = ({ data }: ExpandableRowProps) => {
  const [open, setOpen] = useState(false);

  const expandRow = () => setOpen((s) => !s);

  return (
    <>
      <TableRow
        hover
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={expandRow}
      >
        <TableCell>
          <IconButton size="small">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {data.name}
        </TableCell>
        <TableCell align="center">
          <Chip
            size="small"
            variant="outlined"
            color="primary"
            label={data.totalPoints}
          />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Timeline position="alternate">
              {data.graph.map(({ title, points, time }) => (
                <TimelineItem>
                  <TimelineOppositeContent color="text.secondary">
                    {formatUnix(time)}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    {title}
                    <Chip
                      size="small"
                      variant="outlined"
                      color="primary"
                      label={points}
                      sx={{ ml: 1 }}
                    />
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const RatingTable = () => {
  const { data } = useAppSelector(ratingSelector);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="5%" />
            <TableCell>Команда</TableCell>
            <TableCell align="center">Очки</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((teamRating) => (
            <ExpandableRow key={teamRating.id} data={teamRating} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
