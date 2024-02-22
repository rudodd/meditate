// import library functionality
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';


// import types
import { GoogleUser } from '../types';

// import components
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function Header(props: GoogleUser) {
  const { user } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="app-bar">
      <Container className="app-bar-content">
        <h1>Meditate</h1>
        <div className="app-bar-avatar">
          {user &&
            <>
              <IconButton onClick={openMenu} className="avatar">
                <Avatar alt={user?.name ? user.name : ''} src={user?.image ? user?.image : ''} />
              </IconButton>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={closeMenu}
              >
                <MenuItem onClick={() =>console.log('open settings')}>
                  Settings
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          }
        </div>
      </Container>
    </AppBar>
  )
}