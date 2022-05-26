import { Box, Card, Chip, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { formatUnix } from 'common/utils';
import {
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { ratingSelector } from './ratingSlice';

const colors = ['#d32f2f', '#ab47bc', '#f57c00', '#388e3c'];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  const data = payload?.[0]?.payload;
  if (active && data) {
    return (
      <Card variant="outlined">
        <Box p={1}>
          <Box
            display="flex"
            gap={1}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" noWrap>
              {data.title}
            </Typography>
            <Chip
              size="small"
              variant="outlined"
              color="primary"
              label={data.points}
            />
          </Box>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            В {formatUnix(data.time)}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">
            Очков: {data.value}
          </Typography>
        </Box>
      </Card>
    );
  }

  return null;
};

export const RatingChart = () => {
  const { data } = useAppSelector(ratingSelector);

  return (
    <ResponsiveContainer width="90%" height="90%">
      <ScatterChart>
        {data.map(({ id, name, graph }) => (
          <Scatter
            key={id}
            name={name}
            data={graph}
            fill={colors[id % colors.length]}
            line
          />
        ))}
        <Legend verticalAlign="top" height={36} />
        <XAxis
          dataKey="time"
          domain={['auto', 'auto']}
          tickFormatter={formatUnix}
          type="number"
          padding={{ left: 30 }}
        />
        <YAxis dataKey="value" />
        <Tooltip content={<CustomTooltip />} />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
