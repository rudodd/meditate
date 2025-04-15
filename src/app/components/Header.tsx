// import library functionality
import { useState, useCallback } from 'react';
import { signOut } from 'next-auth/react';

// import types
import { GoogleUser } from '../types';

// import components
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

// component type
interface ComponentProps {
  user: GoogleUser | null | undefined;
  setSettingsOpen: (state: boolean) => void;
  isActive: boolean;
}

export default function Header(props: ComponentProps) {
  const { user, setSettingsOpen, isActive } = props;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>();
  const openMenu = useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget), []);
  const closeMenu = useCallback(() => setAnchorElUser(null), []);

  return (
    <div className="app-bar">
      <Container className="app-bar-content" maxWidth="xs">
        <h1>Meditate</h1>
        <div className="app-bar-avatar">
          {user &&
            <>
              <IconButton onClick={openMenu} className="avatar">
                <Avatar alt={user?.user?.name ? user.user.name : ''} src={user?.user?.image ? user?.user?.image : ''} />
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
                <MenuItem onClick={() => setSettingsOpen(true)} disabled={isActive}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          }
        </div>
      </Container>
    </div>
  )
}