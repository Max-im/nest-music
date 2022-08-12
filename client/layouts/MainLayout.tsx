import React from 'react'
import Navbar from '../components/Navbar';
import Player from '../components/Player';
import { Container } from '../node_modules/@mui/material/index';

const MainLayout: React.FC = ({ children }) => {
    return <div>
        <Navbar/>
        <Container style={{margin: '90px 0'}}>
            { children }
        </Container>
        <Player />       
    </div>
}

export default MainLayout;