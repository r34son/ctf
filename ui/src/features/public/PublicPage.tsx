import styled from "@emotion/styled";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppDispatch } from "app/hooks";
import { RatingChart } from "features/rating/RatingChart";
import { getRating } from "features/rating/ratingSlice";
import { useEffect } from "react";
import { Background } from "./Background";
import logo from './logo.png';


const ContentContainer = styled.div`
  height: 95%;
  margin: 0 auto;
  display: flex;
  margin-left: 95px;
`;

export const PublicPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const request = dispatch(getRating());
    return () => {
      request.abort();
    };
  }, [dispatch]);
  
  return (
    <>
      <Background />
      <Typography variant="h1" align="center">CTF</Typography>
      <Card sx={{
        backgroundColor: 'rgba(18, 18, 18, 0.85)',
        padding: '15px',
        display: 'flex',
        maxWidth: 1250,
        margin: '0 auto 20px',
      }}>
        <CardContent sx={{ flex: 'flex' }}>
          <Typography component="div" variant="h5" gutterBottom>
            Capture The Flag
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div" gutterBottom>
            Это автоматизированная платформа по компьютерной безопасности с
            оригинальным содержанием, построенная на основе захвата флага, созданной
            экспертами по безопасности и конфиденциальности в Крымском Федеральном Университете им. В.И. Вернадского.
          </Typography>
          <br />
          <Typography variant="subtitle1" color="text.secondary" component="div">
            Получите доступ к безопасному и уникальному практическому опыту,
            в котором участники должны взламывать,
            расшифровывать и мыслить творчески и критически, чтобы решать проблемы и захватывать флаги.
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 300, padding: '30px', marginLeft: '100px' }}
          image={logo}
          alt="Live from space album cover"
        />
      </Card>
      <ContentContainer>
        <RatingChart />
      </ContentContainer>
    </>
  );
};
