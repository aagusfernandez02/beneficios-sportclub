import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="fixed" color="primary" sx={{ width: '100%', left: 0 }}>
            <Toolbar>
                <IconButton component={Link} to="/beneficios" edge="start" color="inherit" aria-label="beneficios">
                     <img
                        src="logo-sportclub.webp" 
                        alt="Beneficios"
                        style={{ width: 150, height: 50 }}
                    />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar