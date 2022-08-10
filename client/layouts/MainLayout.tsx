import React from 'react'
import Navbar from '../components/Navbar';
import { Container } from '../node_modules/@mui/material/index';

const MainLayout: React.FC = ({ children }) => {
    return <div>
        <Navbar/>
        <Container style={{margin: "90px 0;"}}>
            { children }
        </Container>
    </div>
}

export default MainLayout;