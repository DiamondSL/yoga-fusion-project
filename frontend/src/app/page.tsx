"use client";
import {Button, Container, Typography} from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import {Box} from "@mui/system";
import { Manrope } from "next/dist/compiled/@next/font/dist/google";
import {NextFont} from "next/dist/compiled/@next/font";



// const LandingPage = gql`
//     query LandingPage($status: PublicationStatus) {
//     landingPage(status: $status) {
//     createdAt
//     documentId
//     Section_One {
//     ... on ComponentSectionTitle {
//     id
//     Title
//     Placement
//     }
//     ... on ComponentSectionButton {
//     id
//     Text
//     Variant
//     }
//     }
//     }
//     }
// `

const Home = () => {
    const { loading, error, data } = useQuery(LandingPage);
    console.log(error, loading, data)
    //
    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;
    // if (data) return <Box>
    //     <Typography variant={'h1'}>{data.articles[0].title}</Typography>
    //     <Typography variant={'body1'}>{data.articles[0].description}</Typography>

    //     </Box>
    //
    // console.log(data)
  return (
      <Container>
      </Container>
  );
}

export default Home;
