import styled from '@emotion/styled';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import SsidChartIcon from '@mui/icons-material/SsidChart';
import {
  Grow,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { useEffect, useState } from 'react';
import { RatingChart } from './RatingChart';
import { getRating } from './ratingSlice';
import { RatingTable } from './RatingTable';

const ContentContainer = styled.div`
  height: 95%;
`;

enum ERatingView {
  CHART,
  TABLE,
}

export const RatingPage = () => {
  const [alignment, setAlignment] = useState(ERatingView.CHART);
  const dispatch = useAppDispatch();

  const handleAlignment = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: ERatingView,
  ) => setAlignment(newAlignment);

  useEffect(() => {
    const request = dispatch(getRating());
    return () => {
      request.abort();
    };
  }, [dispatch]);

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" mb={2}>
        <ToggleButtonGroup
          exclusive
          value={alignment}
          onChange={handleAlignment}
        >
          <ToggleButton value={ERatingView.CHART}>
            <Tooltip title="График">
              <SsidChartIcon />
            </Tooltip>
          </ToggleButton>
          <ToggleButton value={ERatingView.TABLE}>
            <Tooltip title="Таблица">
              <BackupTableIcon />
            </Tooltip>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>
      {alignment === ERatingView.CHART && (
        <Grow in>
          <ContentContainer>
            <RatingChart />
          </ContentContainer>
        </Grow>
      )}
      {alignment === ERatingView.TABLE && (
        <Grow in>
          <ContentContainer>
            <RatingTable />
          </ContentContainer>
        </Grow>
      )}
    </>
  );
};
