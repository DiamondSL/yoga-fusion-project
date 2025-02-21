"use client";
import {Container, Typography} from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import {Box} from "@mui/system";

const GET_ARTICLES = gql`
  query articles {
    articles {
      title
      description
    }
  }
`;

const Home = () => {
    const { loading, error, data } = useQuery(GET_ARTICLES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (data) return <Box>
        <Typography variant={'h1'}>{data.articles[0].title}</Typography>
        <Typography variant={'body1'}>{data.articles[0].description}</Typography>
        </Box>

    console.log(data)
  return (
      <Container>
            <Box>

            </Box>
      </Container>
  );
}

export default Home;
