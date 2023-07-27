import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import RamenDiningTwoToneIcon from '@mui/icons-material/RamenDiningTwoTone';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import '../../../ClientTemplate/_components/Navbar/style.scss'

const pages = [{ currentPage: 'Dish Manager', path: '/' }, { currentPage: 'Order', path: '/order' }];

function AdminNav() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const user = JSON.parse(localStorage.getItem("user") as any);
  const handleIsLogin = () => {
    if (!user) {
      return (
        <Box sx={{ display: { xl: 'flex', }, justifyContent: 'end' }}>
          <Link className='myNav-content-container__link nav-link' to={'/login'}>Login</Link>
        </Box>
      )
    } else return (<Box sx={{ display: { xl: 'flex', }, justifyContent: 'end' }}>
      <span>{user.email}</span>
      <button style={{ backgroundColor: "transparent", border: "none", color: "red" }} onClick={() => {
        localStorage.removeItem("user");
        window.location.replace('/')
      }}><LogoutIcon sx={{ display: { xs: 'none', md: 'flex' } }} /></button>
    </Box>)
  }
  return (
    <div className='myNav'>
      <AppBar position="static" className='myNav-content'>
        <Container maxWidth="xl" className='myNav-content-container'>
          <Toolbar disableGutters>
            <RamenDiningTwoToneIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <Link className='myNav-content-container__link nav-link' to='/'>
                Admin
              </Link>
            </Typography>


            <RamenDiningTwoToneIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HappyMeal
            </Typography>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'end' }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }, justifyContent: 'flex-end',
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.currentPage}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Link className='myNav-content-container__link nav-link'
                to={`/`}
                onClick={handleCloseNavMenu}
              >
                Dish Manager
              </Link>
              <Link className='myNav-content-container__link nav-link'
                to={`/order`}
                onClick={handleCloseNavMenu}
              >
                Order Manger
              </Link>
            </Box>
            {handleIsLogin()}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
export default AdminNav;