import React from 'react'
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { Container } from '../node_modules/@mui/material/index';
import Head from '../node_modules/next/head';

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
    return <>
        <Head>
            <title>{title || 'Nest Music'}</title>
            <meta name="description" content={'Nest music platform ' + description } />
            <meta name="robots" content="index follow" />
            <meta name="keywords" content={keywords || 'music, nest, next'} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

        </Head>
        <Navbar/>
        <Container style={{margin: '90px 0'}}>
            { children }
        </Container>
        <Player />       
    </>
}

export default MainLayout;