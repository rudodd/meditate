// import library functionality
import { useState } from 'react';
import { styled } from '@mui/material/styles';

// import components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Fab from '@mui/material/Fab';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

interface FooterProps {
  isActive: boolean;
  isPaused: boolean;
  play: () => void;
  pause: () => void;
}

export default function Footer(props: FooterProps) {
  const { isActive, isPaused, play, pause } = props;

  const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

  return (
    <AppBar 
      position="fixed" 
      color="primary" 
      sx={{ top: 'auto', bottom: 0 }} 
      className="footer-bar"
    >
    <Toolbar>
      <StyledFab 
        color="secondary" 
        aria-label="add" 
        className={`state-button ${isActive ? 'pause' : 'play'}`}
      >
        {isActive ? (
          <PauseIcon />
        ) : (
          <PlayArrowIcon onClick={() => play()} />
        )}
      </StyledFab>
    </Toolbar>
  </AppBar>
  )
}